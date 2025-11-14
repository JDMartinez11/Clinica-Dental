import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../pages/services/supabase.service'; // ajusta si tu servicio está en pages/services

export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  const user = await supabase.currentUser();
  return user ? true : router.parseUrl('/login-doctor');
};
