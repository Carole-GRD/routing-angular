
// export interface CanComponentDeactivate {
//   canDeactivate: () => boolean | Promise<boolean>;
// }


// export const CanDeactivateGuard = (component: CanComponentDeactivate) => {

//   const canLeave = component.canDeactivate(); 

//   if (canLeave) {
//     return true;
//   } else {
//     return false;
//   }
// };

// ========================================================================================================


import { CanDeactivateFn } from "@angular/router";
import { Observable } from "rxjs/Observable";

export interface ComponentCanDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


export const CanDeactivateGuard: CanDeactivateFn<ComponentCanDeactivate> = (component: ComponentCanDeactivate):  Observable<boolean> | Promise<boolean> | boolean => {

  return component.canDeactivate();

}