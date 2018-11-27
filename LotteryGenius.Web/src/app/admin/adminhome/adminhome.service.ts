import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountService } from "../../shared/account.service";
import { UserService } from "../../shared/user.service";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { UserView } from "../../models/user.view";

@Injectable()
export class AdminhomeService {
    public user: User;
    public users$ = new Subject<Array<UserView>>();

    constructor(private accountService: AccountService,
        private userService: UserService) {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_users();
    }

    private get_users() {
        this.accountService.getUsers().subscribe(data => this.users$.next(data));
    }

    public notify_change_in_users() {
        this.get_users();
    }
}