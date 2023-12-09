import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

export const onlyLoggedInGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.userState$.pipe(
    take(1),
    tap((isLoggedIn) => (console.log('isLoggedIn', isLoggedIn))),
    tap((isLoggedIn) => (!!isLoggedIn ? true : router.navigate(['auth/login'])))
  );
};
