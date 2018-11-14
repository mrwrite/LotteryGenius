import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AccountService, private router: Router) { }

    canActivate() {
        if (!this.auth.loggedIn()) {
            return true;
        } else {
            this.router.navigateByUrl('');
            return false;
        }
    }
}