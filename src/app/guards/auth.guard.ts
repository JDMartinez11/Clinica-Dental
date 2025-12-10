// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const user = this.auth.currentUser;

    if (!user) {
      this.router.navigate(['/login-doctor']);
      return false;
    }

    const snap = await getDoc(doc(this.firestore, 'usuarios', user.uid));

    if (!snap.exists()) {
      this.router.navigate(['/login-doctor']);
      return false;
    }

    // Si quieres validar rol:
    // const data = snap.data() as any;
    // if (data.rol !== 'doctor' && data.rol !== 'admin') { ... }

    return true;
  }
}
