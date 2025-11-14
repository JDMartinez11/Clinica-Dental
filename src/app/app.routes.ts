import { Routes } from '@angular/router';
import { ServicesComponent } from './pages/services/services';
import { AppointmentComponent } from './pages/appointment/appointment';
import { LoginDoctorComponent } from './pages/login-doctor/login-doctor';
import { DashboardDoctorComponent } from './pages/dashboard-doctor/dashboard-doctor';
import { authGuard } from './guards/auth.guard';
import { ARComponent } from './pages/ar/ar';  
import { BrushingGameComponent } from './pages/brushing-game/brushing-game';
import { VRComponent } from './pages/vr/vr';
import { Home} from './pages/home/home'; // Asegúrate de tener el componente Home

export const routes: Routes = [
  // Redirección de la página raíz a HomeComponent
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirige a 'home' por defecto

  // Ruta Home
  { path: 'home', component: Home, title: 'Inicio' },

  // Rutas de servicios
  { path: 'servicios', component: ServicesComponent, title: 'Servicios' },
  { path: 'citas', component: AppointmentComponent, title: 'Agendar Cita' },
  { path: 'login-doctor', component: LoginDoctorComponent, title: 'Login Doctor' },

  // Rutas para AR, VR y Brushing Game
  { path: 'ar', component: ARComponent, title: 'Realidad Aumentada' },
  { path: 'vr', component: VRComponent, title: 'Realidad Virtual' },
  { path: 'juego', component: BrushingGameComponent, title: 'Juego: Cepilla y Gana' },

  // Rutas protegidas con guardia (Auth)
  { path: 'dashboard-doctor', component: DashboardDoctorComponent, canActivate: [authGuard], title: 'Panel del Doctor' },

  // Ruta comodín para cualquier ruta no encontrada (página de error)
  { path: '**', redirectTo: '/home' }  // Redirige a 'home' si la ruta no existe
];
