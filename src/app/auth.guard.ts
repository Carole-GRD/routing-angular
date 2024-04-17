import { inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";


export const AuthGuard = () => {

  const user = inject(AuthService);
  const router = inject(Router);

  if (user.loggedIn) {
    return true;
  }
  // router.navigateByUrl('/login');
  router.navigate(['/']);
  return false;

}