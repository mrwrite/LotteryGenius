import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user: User;

    constructor() {
    }

    set(user: User): void {
        this.user = user;
    }

    get(): User {
        return this.user;
    }

    delete(): void {
        this.user = null;
    }
}