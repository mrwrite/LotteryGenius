import { Component, OnInit, NgModule, AfterViewInit } from '@angular/core';
import { AccountService } from "../shared/account.service";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { UserView } from "../models/user.view";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public user: User;
    public users: UserView[];
    public role: string;
    public today: number = Date.now();

    isExpanded = false;

    constructor(private userService: UserService, private accountService: AccountService, private router: Router) { }

    ngOnInit(): void {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.accountService.getUsers().subscribe(data => this.users = data);

        if (!this.user) {
            this.router.navigate([""]);
        } else {
            if (this.user.initialLogin === 'True') {
                this.router.navigate(["change-password"]);
            } else {
                this.role = this.user.role;
            }
        }
    }

    public logout() {
        this.accountService.logout();
        this.router.navigate([""]);
    }
}