import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-doctor.html',
  styleUrls: ['./dashboard-doctor.scss']
})
export class DashboardDoctorComponent implements OnInit {
  appts:any[] = [];
  loading = true;
  error = '';

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    try {
      this.appts = await this.supabase.myAppointments(); // RLS filtra por doctor logueado
    } catch (e:any) {
      this.error = e?.message ?? 'No fue posible cargar las citas';
    } finally {
      this.loading = false;
    }
  }

  async logout(){
    await this.supabase.signOut();
    location.href = '/#/login-doctor';
  }
}
