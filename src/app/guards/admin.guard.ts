// src/app/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const user = this.auth.currentUser;

    // ❌ No hay usuario autenticado
    if (!user) {
      return this.block();
    }

    // 🔎 Leer su documento en "usuarios"
    const snap = await getDoc(doc(this.firestore, 'usuarios', user.uid));

    if (!snap.exists()) {
      return this.block();
    }

    const data = snap.data() as any;
    const rol = data.rol;

    // ❌ No es admin
    if (rol !== 'admin') {
      return this.block();
    }

    // ✅ Todo bien, sí es admin
    return true;
  }

  private block(): boolean {
    this.router.navigate(['/no-autorizado']);
    return false;
  }
}
