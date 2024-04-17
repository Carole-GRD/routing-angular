
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const CanDeactivateGuard = (component: CanComponentDeactivate) => {

  const canLeave = component.canDeactivate(); 
  
  if (canLeave) {
    return true;
  } else {
    return false;
  }
};

