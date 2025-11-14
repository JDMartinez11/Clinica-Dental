import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';


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

  constructor(private supabase: SupabaseService, private router: Router) {}

  async login() {
    this.error = '';
    this.loading = true;
    try {
      await this.supabase.signIn(this.email, this.password);
      this.router.navigate(['/dashboard-doctor']);
    } catch (e: any) {
      this.error = e?.message ?? 'No fue posible iniciar sesión';
    } finally {
      this.loading = false;
    }
  }
}
