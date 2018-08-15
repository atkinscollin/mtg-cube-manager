import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private tokenService: TokenService, private router: Router) { }

    canActivate() {
        if (!this.tokenService.checkToken()) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}