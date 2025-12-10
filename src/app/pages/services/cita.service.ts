// src/app/services/citas.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Cita {
  id: string;
  doctor_id: string;
  doctor_uid?: string;
  patient_name: string;
  service: string;
  date: string;       // "YYYY-MM-DD"
  start_time: string; // "HH:MM"
  notes?: string;
  // status puede venir vacío en citas viejas → luego lo tratamos como 'pendiente'
  status?: 'pendiente' | 'completada' | 'cancelada';
}

@Injectable({ providedIn: 'root' })
export class CitasService {
  constructor(private firestore: Firestore) {}

  // 🔹 Citas del doctor (panel doctor)
  getCitasDoctor(doctorUid: string): Observable<Cita[]> {
    const colRef = collection(this.firestore, 'citas');
    const q = query(colRef, where('doctor_uid', '==', doctorUid));
    return collectionData(q, { idField: 'id' }) as Observable<Cita[]>;
  }

  // 🔹 Citas del paciente (Mis Citas)
  getCitasPaciente(patientUid: string): Observable<Cita[]> {
    const colRef = collection(this.firestore, 'citas');
    const q = query(colRef, where('patient_uid', '==', patientUid));
    return collectionData(q, { idField: 'id' }) as Observable<Cita[]>;
  }

  // 🔹 Marcar cita como completada (lo usa el doctor)
  async marcarComoCompletada(citaId: string): Promise<void> {
    const ref = doc(this.firestore, 'citas', citaId);
    await updateDoc(ref, { status: 'completada' });
  }
}
