// import { inject } from "@angular/core";
// import { Router } from "@angular/router";


// import { AuthService } from "./auth.service";


// export const AuthGuard = () => {

//   const user = inject(AuthService);
//   const router = inject(Router);

//   if (user.loggedIn) {
//     return true;
//   }

//   router.navigate(['/']);
//   return false;

// }


// ========================================================================================================


import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";


export const AuthGuard = (): Observable<boolean> | Promise<boolean> | boolean => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated()
    .then(
      (authenticated: boolean) => {
        if (authenticated) {
          return true;
        } else {
          router.navigate(['/']);
        }
      }
    );

};