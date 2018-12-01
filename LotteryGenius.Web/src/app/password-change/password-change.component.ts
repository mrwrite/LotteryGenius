import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AccountService } from "../shared/account.service";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { Password } from "../models/password";

@Component({
    selector: 'password-change',
    templateUrl: './password-change.component.html',
    styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
    public password_change: Password;
    public error: any = null;
    public response: any = null;
    public creds = {
        username: "",
        password: ""
    };

    private user: User;

    constructor(private userService: UserService, private accountService: AccountService, private router: Router) {
        this.password_change = new Password();
        this.user = new User();
    }

    private jwtHelper: JwtHelperService = new JwtHelperService();

    ngOnInit(): void {
        this.user = this.userService.get();
        if (this.user) {
            this.password_change.old_password = this.user.password;
            this.password_change.email = this.user.unique_name;
        }
    }

    changePassword() {
        this.error = null;
        this.response = null;
        this.accountService.changePassword(this.password_change)
            .subscribe(
                data => {
                    this.response = data;

                    this.creds.username = this.user.unique_name;
                    this.creds.password = this.password_change.new_password;

                    this.accountService.login(this.creds)
                        .subscribe(
                            data => {
                                localStorage.setItem('token', data.token);
                                this.userService.set(this.jwtHelper.decodeToken(data.token));
                                let newUser = this.userService.get();
                                newUser.password = this.creds.password;
                                this.userService.set(newUser);
                                localStorage.setItem('user', JSON.stringify(this.jwtHelper.decodeToken(data.token)));
                                this.router.navigate(["dashboard"]);
                            },
                            error => {
                                this.error = error._body;
                            });
                },
                error => { this.error = error });
    }
}