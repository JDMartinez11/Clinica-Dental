import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService, Cita } from '../services/cita.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-citas.html',
  styleUrls: ['./mis-citas.scss'],
})
export class MisCitasComponent implements OnInit {
  loading = true;
  error = '';

  citas: Cita[] = [];

  total = 0;
  pendientes = 0;
  completadas = 0;

  constructor(
    private citasService: CitasService,
    private authService: AuthService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const uid = this.authService.currentUser?.uid;
    if (!uid) {
      this.error = 'Debes iniciar sesión para ver tus citas.';
      this.loading = false;
      return;
    }

    this.citasService.getCitasPaciente(uid).subscribe({
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
          this.error = 'No se pudieron cargar tus citas.';
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
    });
  }

  private recalcularStats() {
    this.total = this.citas.length;
    this.pendientes = this.citas.filter((c) => c.status === 'pendiente').length;
    this.completadas = this.citas.filter((c) => c.status === 'completada').length;
  }
}
