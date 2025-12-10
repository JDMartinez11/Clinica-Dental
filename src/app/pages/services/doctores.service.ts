// src/app/services/doctores.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Doctor {
  id?: string;
  name: string;
  specialty: string;
  telefono?: string;
  activo?: boolean;
  userId?: string;
}

@Injectable({ providedIn: 'root' })
export class DoctoresService {
  constructor(private firestore: Firestore) {}

  getDoctores(): Observable<Doctor[]> {
    const ref = collection(this.firestore, 'doctores');
    return collectionData(ref, { idField: 'id' }) as Observable<Doctor[]>;
  }
}


