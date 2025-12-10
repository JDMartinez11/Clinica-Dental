import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    this.error = '';
    this.loading = true;

    try {
      // 👇 ESTE login es SOLO para pacientes
      const res = await this.authService.loginPaciente(this.email, this.password);

      // Si loginPaciente no lanzó error, el rol YA es 'paciente'
      if (res.rol === 'paciente') {
        this.router.navigate(['/dashboard-paciente']);
      } else {
        // Esto en teoría nunca debería pasar, pero lo dejamos por seguridad
        this.error = 'Credenciales erroneas verifica el.';
      }
    } catch (err: any) {
      console.error(err);
      this.error = err?.message || 'Correo o contraseña incorrectos.';
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    this.error = '';
    this.loading = true;

    try {
      const res = await this.authService.loginWithGoogle();

      // 👇 Igual: este login es de PACIENTES. Si viene doctor/admin, lo bloqueamos.
      if (res.rol === 'paciente') {
        this.router.navigate(['/home']); // o /dashboard-paciente cuando lo uses
      } else {
        this.error = 'No se pudo realizar el acceso verifique credenciales.';
      }
    } catch (err: any) {
      console.error(err);
      this.error = err?.message || 'No se pudo iniciar sesión con Google.';
    } finally {
      this.loading = false;
    }
  }
}
