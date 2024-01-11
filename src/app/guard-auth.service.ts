import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Auth } from "./auth.service";


export const GuardAuth: CanActivateFn = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
       return inject(Auth).authenticated(); 
    }
    