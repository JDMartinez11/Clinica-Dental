import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// Ajusta la ruta según tu estructura:
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  // ---------- AUTH ----------
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data; // session, user
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }

  async currentUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  // ---------- DATA ----------
  async getServices() {
    const { data, error } = await this.supabase.from('services').select('*');
    if (error) throw error;
    return data;
  }

// Doctores
  async getDoctors() {
    const { data, error } = await this.supabase.from('doctors').select('id:user_id, name, specialty');
    if (error) throw error;
    return data;
  }

  // Slots ocupados de un doctor en una fecha
  async getTakenSlots(doctorId: string, date: string) {
    const { data, error } = await this.supabase
      .from('appointments')
      .select('start_time')
      .eq('doctor_id', doctorId)
      .eq('date', date);
    if (error) throw error;
    // normaliza a 'HH:MM'
    return (data || []).map(d => String(d.start_time).slice(0,5));
  }

  // Crear cita pública seleccionando doctor y slot
  async addAppointmentPublic(appt: {
    doctor_id: string;
    patient_name: string;
    service: string;
    date: string;          // 'YYYY-MM-DD'
    start_time: string;    // 'HH:MM'
    notes?: string;
  }) {
    const { data, error } = await this.supabase
      .from('appointments')
      .insert([appt])
      .select();

    if (error) throw error;
    return data;
  }

  // Con RLS + trigger, NO envíes doctor_id desde cliente
  async addAppointmentSecure(payload: { patient_name: string; service: string; date: string; hour: string; notes?: string; }) {
    const { data, error } = await this.supabase.from('appointments').insert([payload]).select();
    if (error) throw error;
    return data;
  }

  async myAppointments() {
    const { data, error } = await this.supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true })
      .order('hour', { ascending: true });
    if (error) throw error;
    return data;
  }
  
  
}
