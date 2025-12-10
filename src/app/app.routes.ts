// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ServicesComponent } from './pages/services/services';
import { AppointmentComponent } from './pages/appointment/appointment';
import { LoginDoctorComponent } from './pages/login-doctor/login-doctor';
import { DashboardDoctorComponent } from './pages/dashboard-doctor/dashboard-doctor';
import { AuthGuard } from './guards/auth.guard';
import { ARComponent } from './pages/ar/ar';
import { BrushingGameComponent } from './pages/brushing-game/brushing-game';
import { VRComponent } from './pages/vr/vr';
import { Home } from './pages/home/home';
import { RegisterDoctorComponent } from './pages/register-doctor/register-doctor';
import { LoginComponent } from './pages/login/login';
import { NoAutorizadoComponent } from './pages/no-autorizado/no-autorizado';
import { RegisterPacienteComponent } from './pages/register-paciente/register-paciente';
import { MisCitasComponent } from './pages/mis-citas/mis-citas';

import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // 👈 IMPORTANTE: sin "/" al inicio
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home, title: 'Inicio' },

  { path: 'registro-paciente', component: RegisterPacienteComponent, title: 'Registro de Paciente' },

  { path: 'login', component: LoginComponent, title: 'Iniciar sesión' },
  { path: 'login-doctor', component: LoginDoctorComponent, title: 'Login Doctor' },

  { path: 'servicios', component: ServicesComponent, title: 'Servicios' },
  { path: 'citas', component: AppointmentComponent, title: 'Agendar Cita' },

  { path: 'no-autorizado', component: NoAutorizadoComponent, title: 'No autorizado' },

  { path: 'ar', component: ARComponent, title: 'Realidad Aumentada' },
  { path: 'vr', component: VRComponent, title: 'Realidad Virtual' },
  { path: 'juego', component: BrushingGameComponent, title: 'Juego: Cepilla y Gana' },

  { path: 'registro-doctor', component: RegisterDoctorComponent, title: 'Registro Doctor' },

  {
    path: 'dashboard-doctor',
    component: DashboardDoctorComponent,
    canActivate: [AuthGuard],
    title: 'Panel del Doctor',
  },

  {
    path: 'mis-citas',
    component: MisCitasComponent,
    canActivate: [AuthGuard],
    title: 'Mis Citas',
  },

  // 👈 SIEMPRE al final, y también sin "/"
  { path: '**', redirectTo: 'home' },
];
