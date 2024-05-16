import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const localData = localStorage.getItem('userLogin');

  if (localData != null) {
    console.log('pase');
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
