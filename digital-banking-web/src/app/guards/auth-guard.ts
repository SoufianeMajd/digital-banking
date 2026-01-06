import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated) {
    // Try to load from local storage
    if (localStorage.getItem("access-token")) {
      authService.loadTokenFromLocalStorage();
      return true;
    }
    router.navigateByUrl("/login");
    return false;
  }
  return true;
};
