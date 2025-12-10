import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import {
  Auth,
  User,
  onAuthStateChanged,
  signOut,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

// Tipo de perfil para mostrar el saludo
interface UsuarioPerfil {
  nombre?: string;
  email?: string;
  telefono?: string;
  rol?: 'paciente' | 'doctor' | 'admin';
  createdAt?: any;
  authProvider?: 'password' | 'google';
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  usuarioPerfil: UsuarioPerfil | null = null;
  private perfilCargando = false;

  // 👇 bandera para saber si está ejecutándose como PWA instalada
  esPwa = false;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 1. Detectar al inicio
    this.actualizarModoPwa();

    // 2. Escuchar cambios de sesión
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.cargarPerfil(user);
      } else {
        this.usuarioPerfil = null;
      }
    });

    // 3. Re-checar cuando la página se vuelve visible o se "reabre"
    if (typeof window !== 'undefined') {
      window.addEventListener('pageshow', () => this.actualizarModoPwa());
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.actualizarModoPwa();
        }
      });
    }
  }

  // Después de que la vista ya se pintó
  ngAfterViewInit(): void {
    // Pequeño delay para asegurarnos de que el navegador ya asignó el display-mode
    setTimeout(() => {
      this.actualizarModoPwa();
    }, 0);
  }

  // Ejecuta la detección y refresca la vista
  private actualizarModoPwa() {
    this.detectarPwa();
    this.cdr.detectChanges();
  }

  // Detecta si la app está en modo standalone / PWA instalada
  private detectarPwa() {
    if (typeof window === 'undefined') {
      this.esPwa = false;
      return;
    }

    const mm = (q: string) =>
      'matchMedia' in window && window.matchMedia(q).matches;

    const isStandalone = mm('(display-mode: standalone)');
    const isMinimalUi = mm('(display-mode: minimal-ui)');
    const isFullscreen = mm('(display-mode: fullscreen)');
    const isWco = mm('(display-mode: window-controls-overlay)');
    const isIosStandalone = (window.navigator as any).standalone === true;
    const isTwa = document.referrer.startsWith('android-app://');

    this.esPwa =
      isStandalone ||
      isMinimalUi ||
      isFullscreen ||
      isWco ||
      isIosStandalone ||
      isTwa;
  }

  // Cargar perfil desde la colección "usuarios"
  private async cargarPerfil(user: User) {
    this.perfilCargando = true;
    try {
      const ref = doc(this.firestore, 'usuarios', user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        this.usuarioPerfil = snap.data() as UsuarioPerfil;
      } else {
        this.usuarioPerfil = {
          nombre: '',
          email: user.email ?? '',
          rol: 'paciente',
          createdAt: new Date(),
        };
      }
    } catch (err) {
      console.error('Error cargando perfil en navbar:', err);
    } finally {
      this.perfilCargando = false;
    }
  }

  get estaLogueado(): boolean {
    return !!this.auth.currentUser;
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.usuarioPerfil = null;
      this.router.navigate(['/home']);
    } catch (err) {
      console.error('Error al cerrar sesión desde navbar:', err);
    }
  }
}
