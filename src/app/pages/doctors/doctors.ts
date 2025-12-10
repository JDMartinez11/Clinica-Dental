// src/app/login-doctor/login-doctor.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './doctors.html',
// Si tienes un doctors.scss, usa eso; si no, puedes quitar styleUrls:
styleUrls: ['./doctors.scss'], // o bórralo si no existe

  standalone: true,
  imports: [] // aquí van CommonModule, FormsModule, etc, según tu config
})
export class LoginDoctorComponent {
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
      await this.authService.loginDoctor(this.email, this.password);
      this.router.navigate(['/dashboard-doctor']);
    } catch (err: any) {
      console.error(err);
      this.error = err?.message || 'Correo o contraseña incorrectos.';
    } finally {
      this.loading = false;
    }
  }
}
