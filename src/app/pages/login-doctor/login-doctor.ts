import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // 👈 sube dos niveles: app/services



@Component({
  selector: 'app-login-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-doctor.html',
  styleUrls: ['./login-doctor.scss'],
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
      // 🔐 Login con Firebase + validación de rol doctor/admin
      await this.authService.loginDoctor(this.email, this.password);

      // ✅ Si todo bien, manda al dashboard del doctor
      this.router.navigate(['/dashboard-doctor']);
    } catch (err: any) {
      console.error(err);
      this.error = err?.message || 'Correo o contraseña incorrectos.';
    } finally {
      this.loading = false;
    }
  }
  
}
