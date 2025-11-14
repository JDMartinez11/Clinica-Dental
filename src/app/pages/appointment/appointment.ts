import { Component, OnInit, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import jsPDF from 'jspdf';
import { gsap } from 'gsap';

type ApptModel = {
  doctor_id: string;
  patient_name: string;
  service: string;
  date: string;        // YYYY-MM-DD
  start_time: string;  // HH:MM
  notes?: string;
};

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment.html',
  styleUrls: ['./appointment.scss']
})
export class AppointmentComponent implements OnInit {
  private zone = inject(NgZone);

  doctors: any[] = [];
  slots: string[] = [];
  taken: Set<string> = new Set();

  loading = true;
  saving = false;
  msg = '';
  err = '';

  model: ApptModel = {
    doctor_id: '',
    patient_name: '',
    service: '',
    date: '',
    start_time: '',
    notes: ''
  };

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.loadDoctors(); // Llamar a la función async para cargar los doctores

    // Animación inicial con GSAP
    gsap.fromTo(".model-viewer", { opacity: 0 }, { opacity: 1, duration: 2 });
  }

  async loadDoctors() {
    try {
      console.log('[appt] cargando doctores…');
      const docs = await this.supabase.getDoctors();
      this.zone.run(() => {
        this.doctors = docs ?? [];
        this.slots = this.generateSlots90('10:00', '17:00');
        this.loading = false;
      });
    } catch (e: any) {
      console.error('[appt] error:', e);
      this.zone.run(() => {
        this.err = e?.message ?? JSON.stringify(e);
        this.loading = false;
      });
    }
  }

  generateSlots90(start: string, end: string) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const startMin = sh * 60 + sm;
    const endMin   = eh * 60 + em;
    const step     = 90;

    const res: string[] = [];
    for (let t = startMin; t + step <= endMin; t += step) {
      const h = Math.floor(t / 60).toString().padStart(2, '0');
      const m = (t % 60).toString().padStart(2, '0');
      res.push(`${h}:${m}`);
    }
    return res;
  }

  async refreshTaken() {
    this.msg = '';
    this.err = '';
    this.model.start_time = '';
    this.taken.clear();

    if (!this.model.doctor_id || !this.model.date) return;

    try {
      const taken = await this.supabase.getTakenSlots(this.model.doctor_id, this.model.date);
      this.zone.run(() => {
        this.taken = new Set(taken); // 'HH:MM'
      });
    } catch (e: any) {
      this.zone.run(() => this.err = e?.message ?? 'No fue posible cargar horarios');
    }
  }

  slotDisabled(s: string) { return this.taken.has(s); }

  // Función para seleccionar la hora
  pickSlot(s: string) { 
    if (!this.slotDisabled(s)) { 
      this.model.start_time = s; 
    }
  }

  // Función de envío de datos
  async submit() {
    this.msg = '';
    this.err = '';
    this.saving = true;

    // Verificar si la hora está seleccionada antes de enviar
    if (!this.model.start_time) {
      this.err = 'La hora de la cita es obligatoria.';
      this.saving = false;
      return;  // Salir si no se tiene hora
    }

    try {
      const keepDoctor = this.model.doctor_id;
      const keepDate = this.model.date;

      const appt = { ...this.model };
      await this.supabase.addAppointmentPublic(appt);  // Guardar la cita en la base de datos

      // Crear PDF
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Confirmación de Cita Dental', 20, 20);
      doc.setFontSize(12);
      doc.text(`Paciente: ${appt.patient_name}`, 20, 40);
      doc.text(`Doctor:   ${this.doctors.find(d => d.id === appt.doctor_id)?.name ?? '—'}`, 20, 50);
      doc.text(`Servicio: ${appt.service}`, 20, 60);
      doc.text(`Fecha:    ${appt.date}`, 20, 70);
      doc.text(`Hora:     ${appt.start_time}`, 20, 80);  // Aquí es donde se muestra la hora
      if (appt.notes) doc.text(`Notas: ${appt.notes}`, 20, 90);
      doc.save(`cita-${(appt.patient_name || 'paciente').replace(/\s+/g, '_')}.pdf`);

      this.zone.run(() => {
        this.msg = 'Cita creada correctamente';
        this.model = {
          doctor_id: keepDoctor,
          date: keepDate,
          patient_name: '',
          service: '',
          start_time: '',
          notes: ''
        };
      });

      await this.refreshTaken();
    } catch (e: any) {
      this.zone.run(() => {
        if (String(e?.message || '').includes('duplicate key') || String(e?.code || '') === '23505') {
          this.err = 'Ese horario ya está ocupado para ese doctor.';
        } else {
          this.err = e?.message ?? 'No fue posible guardar la cita';
        }
      });
    } finally {
      this.zone.run(() => this.saving = false);
    }
  }
}
