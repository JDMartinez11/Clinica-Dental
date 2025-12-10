import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class DoctorGuard implements CanActivate {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  async canActivate() {
    const user = this.auth.currentUser;
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const snap = await getDoc(doc(this.firestore, 'usuarios', user.uid));

    if (!snap.exists()) {
      this.router.navigate(['/login']);
      return false;
    }

    const rol = (snap.data() as any).rol;
    if (rol !== 'doctor' && rol !== 'admin') {
      this.router.navigate(['/no-autorizado']);
      return false;
    }

    return true;
  }
}
