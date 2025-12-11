// src/app/pages/register-paciente/register-paciente.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-paciente.html',
  styleUrls: ['./register-paciente.scss'],
})
export class RegisterPacienteComponent {
  nombre = '';
  email = '';
  password = '';
  telefono = '';

  loading = false;
  error = '';
  msg = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async registrar() {
    this.error = '';
    this.msg = '';
    this.loading = true;

    try {
      await this.authService.registerPaciente({
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        telefono: this.telefono,
      });

     this.msg = 'Registro completado. Redirigiendo al inicio de sesión...';

setTimeout(() => {
  this.router.navigate(['/login']);
}, 1500);
 } catch (e: any) {
  console.error(e);

  if (e?.code === 'auth/email-already-in-use') {
    this.error = 'Ya existe una cuenta con este correo. Por favor, inicia sesión.';
  } else {
    this.error = e?.message ?? 'No fue posible registrar la cuenta.';
  }
}
}
}
