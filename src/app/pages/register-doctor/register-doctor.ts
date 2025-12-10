import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-doctor.html',
  styleUrls: ['./register-doctor.scss'],
})
export class RegisterDoctorComponent {
  nombre = '';
  email = '';
  password = '';
  telefono = '';
  specialty = '';

  loading = false;
  error = '';
  msg = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async register() {
    this.error = '';
    this.msg = '';
    this.loading = true;

    try {
      await this.authService.registerDoctor({
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        telefono: this.telefono,
        specialty: this.specialty,
      });

      this.msg = 'Doctor registrado correctamente.';
      // Si quieres mandar directo al dashboard:
      // this.router.navigate(['/dashboard-doctor']);
    } catch (err: any) {
      console.error(err);
      this.error = err?.message || 'No se pudo registrar el doctor.';
    } finally {
      this.loading = false;
    }
  }
  async loginWithGoogle() {
    this.error = '';
    this.loading = true;

    try {
      const res = await this.authService.loginWithGoogle();

      // Redirección según rol
      if (res.rol === 'paciente') {
        this.router.navigate(['/home']); // o /dashboard-paciente cuando exista
      }
      if (res.rol === 'doctor') {
        this.router.navigate(['/dashboard-doctor']);
      }
      if (res.rol === 'admin') {
        this.router.navigate(['/dashboard-doctor']); // o /admin
      }
    } catch (err: any) {
      console.error(err);
      this.error = err?.message || 'No se pudo iniciar sesión con Google.';
    } finally {
      this.loading = false;
    }
  }
}
