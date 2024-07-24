import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router } from '@angular/router';

export const canActivateAuth = () => {
    const isLogeIn = inject(AuthService).isAuth
    if (isLogeIn) {
        return true
    }

    return inject(Router).createUrlTree(['/'])
}