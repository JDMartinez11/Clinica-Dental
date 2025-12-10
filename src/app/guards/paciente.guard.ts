// src/app/guards/paciente.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class PacienteGuard implements CanActivate {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const user = this.auth.currentUser;
    if (!user) {
      return this.redirect();
    }

    const snap = await getDoc(doc(this.firestore, 'usuarios', user.uid));
    if (!snap.exists()) {
      return this.redirect();
    }

    const data = snap.data() as any;
    const rol = data.rol;

    if (rol !== 'paciente') {
      return this.redirect();
    }

    return true;
  }

  private redirect(): boolean {
    this.router.navigate(['/login']); // o '/no-autorizado' si quieres
    return false;
  }
}
