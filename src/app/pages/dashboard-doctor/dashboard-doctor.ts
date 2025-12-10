import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService, Cita } from '../services/cita.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-doctor.html',
  styleUrls: ['./dashboard-doctor.scss'],
})
export class DashboardDoctorComponent implements OnInit {
  loading = true;
  error = '';

  citas: Cita[] = [];

  totalHoy = 0;
  pendientes = 0;
  completadas = 0;

  guardandoId: string | null = null;

  constructor(
    private citasService: CitasService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const uid = this.authService.currentUser?.uid;
    if (!uid) {
      this.error = 'No se encontró el usuario actual.';
      this.loading = false;
      return;
    }

    // 🔴 Suscripción en tiempo real a las citas del doctor
    this.citasService.getCitasDoctor(uid).subscribe({
      next: (rawCitas) => {
        this.ngZone.run(() => {
          this.citas = rawCitas.map((c) => ({
            ...c,
            status: c.status || 'pendiente',
          }));
          this.recalcularStats();
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error(err);
        this.ngZone.run(() => {
          this.error = 'No se pudieron cargar las citas.';
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
    });
  }

  private recalcularStats() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    this.totalHoy = this.citas.filter((c) => c.date === todayStr).length;
    this.pendientes = this.citas.filter((c) => c.status === 'pendiente').length;
    this.completadas = this.citas.filter((c) => c.status === 'completada').length;
  }

  async marcarComoCompletada(cita: Cita) {
    if (!cita.id || cita.status === 'completada') return;

    this.guardandoId = cita.id;
    this.error = '';
    this.cdr.detectChanges();

    try {
      await this.citasService.marcarComoCompletada(cita.id);

      // Actualizamos en memoria y dejamos que Firestore también dispare
      this.ngZone.run(() => {
        cita.status = 'completada';
        this.recalcularStats();
        this.guardandoId = null;
        this.cdr.detectChanges();
      });
    } catch (err) {
      console.error(err);
      this.ngZone.run(() => {
        this.error = 'No se pudo marcar la cita como completada.';
        this.guardandoId = null;
        this.cdr.detectChanges();
      });
    }
  }

  esGuardando(c: Cita): boolean {
    return this.guardandoId === c.id;
  }
}
