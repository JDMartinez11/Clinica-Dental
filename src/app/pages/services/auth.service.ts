// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { 
  Auth, 
  User, 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';

import { 
  Firestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc 
} from '@angular/fire/firestore';

// 👇 Tipo de datos del perfil en la colección "usuarios"
export interface UsuarioPerfil {
  nombre: string;
  email: string;
  telefono?: string;
  rol: 'paciente' | 'doctor' | 'admin';
  createdAt: any;
  authProvider?: 'password' | 'google';
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // ✅ Helper para asegurar que SIEMPRE haya documento en "usuarios"
  private async ensureUserProfile(
    user: User,
    defaultRol: 'paciente' | 'doctor' | 'admin' = 'paciente',
    extraData: Partial<UsuarioPerfil> = {}
  ): Promise<UsuarioPerfil> {
    const ref = doc(this.firestore, 'usuarios', user.uid);
    const snap = await getDoc(ref);

    // Si ya existe el perfil, lo regresamos
    if (snap.exists()) {
      return snap.data() as UsuarioPerfil;
    }

    // Si no existe, lo creamos
    const profile: UsuarioPerfil = {
      nombre: extraData.nombre ?? user.displayName ?? '',
      email: extraData.email ?? user.email ?? '',
      telefono: extraData.telefono ?? '',
      rol: extraData.rol ?? defaultRol,
      createdAt: extraData.createdAt ?? new Date(),
      authProvider: extraData.authProvider ?? (
        user.providerData[0]?.providerId === 'google.com' ? 'google' : 'password'
      ),
    };

    await setDoc(ref, profile as any);
    return profile;
  }

  // 🔹 LOGIN DOCTOR (NO crea perfil, solo permite doctor/admin)
  async loginDoctor(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    const ref = doc(this.firestore, 'usuarios', uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      throw new Error('Tu perfil no existe en la base de datos.');
    }

    const data = snap.data() as any;

    if (data.rol !== 'doctor' && data.rol !== 'admin') {
      // aquí podrías hacer signOut si quieres dejar todo limpio:
      await signOut(this.auth);
      throw new Error('No tienes permiso para entrar como doctor.');
    }

    return { user: cred.user, rol: data.rol };
  }

  // 🔹 REGISTRAR DOCTOR
  async registerDoctor(options: {
    nombre: string;
    email: string;
    password: string;
    telefono?: string;
    specialty?: string;
  }) {
    const { nombre, email, password, telefono, specialty } = options;

    // 1. Crear usuario en Auth
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    // 2. Crear documento en "usuarios"
    await setDoc(doc(this.firestore, 'usuarios', uid), {
      nombre,
      email,
      telefono: telefono || '',
      rol: 'doctor',
      createdAt: new Date(),
    });

    // 3. Crear documento en "doctores"
    await addDoc(collection(this.firestore, 'doctores'), {
      userId: uid,
      name: nombre,
      specialty: specialty || '',
      telefono: telefono || '',
      activo: true,
    });

    return cred.user;
  }

  // 🔹 Registrar Paciente
  async registerPaciente(options: {
    nombre: string;
    email: string;
    password: string;
    telefono?: string;
  }) {
    const { nombre, email, password, telefono } = options;

    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    await setDoc(doc(this.firestore, 'usuarios', uid), {
      nombre,
      email,
      telefono: telefono || '',
      rol: 'paciente',
      createdAt: new Date(),
      authProvider: 'password',
    });

    return cred.user;
  }

  logout() {
    return signOut(this.auth);
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  async registerAdmin(options: {
    nombre: string;
    email: string;
    password: string;
  }) {
    const { nombre, email, password } = options;

    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    await setDoc(doc(this.firestore, 'usuarios', uid), {
      nombre,
      email,
      rol: 'admin',
      creadoEn: new Date(),
      authProvider: 'password',
    });

    return cred.user;
  }

  // 🔹 LOGIN GENÉRICO (lo puedes usar si quieres, pero YA NO para el login de pacientes)
  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);

    // 👇 Asegura que el documento en "usuarios" exista
    const perfil = await this.ensureUserProfile(cred.user, 'paciente');

    return { 
      user: cred.user, 
      rol: perfil.rol,
      perfil, // aquí te llega todo el perfil por si lo quieres mostrar
    };
  }

  // 🔹 LOGIN PACIENTE (rol estrictamente 'paciente')
  async loginPaciente(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);

    // usamos el helper para garantizar que tiene perfil
    const perfil = await this.ensureUserProfile(cred.user, 'paciente');

    if (perfil.rol !== 'paciente') {
      // por seguridad cerramos sesión si intentó entrar por el login equivocado
      await signOut(this.auth);
      throw new Error('Esta cuenta no es de paciente. Usa el acceso de doctores.');
    }

    return {
      user: cred.user,
      rol: perfil.rol,
      perfil,
    };
  }

  // 🔹 LOGIN / REGISTRO AUTOMÁTICO CON GOOGLE (paciente por defecto)
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    // 1. Popup de Google
    const cred = await signInWithPopup(this.auth, provider);
    const uid = cred.user.uid;

    // 2. Ver si ya existe perfil en "usuarios"
    const ref = doc(this.firestore, 'usuarios', uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // 3. Si no existe → crear como paciente por defecto
      await setDoc(ref, {
        nombre: cred.user.displayName || '',
        email: cred.user.email,
        telefono: '',
        rol: 'paciente',
        createdAt: new Date(),
        authProvider: 'google',
      });

      return { user: cred.user, rol: 'paciente', nuevo: true };
    }

    const data = snap.data() as any;
    return { user: cred.user, rol: data.rol, nuevo: false };
  }

}
