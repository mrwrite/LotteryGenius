import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AccountService } from "../shared/account.service";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public creds = {
        username: "",
        password: ""
    };

    public error_message: string = "";

    constructor(private auth: AccountService, private userService: UserService, private router: Router) { }

    private jwtHelperService: JwtHelperService = new JwtHelperService();

    onLogin() {
        let response = this.auth.login(this.creds)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    this.userService.set(this.jwtHelperService.decodeToken(data.token));
                    let newUser = this.userService.get();
                    newUser.password = this.creds.password;
                    this.userService.set(newUser);
                    localStorage.setItem('user', JSON.stringify(this.jwtHelperService.decodeToken(data.token)));
                    if (newUser.role === 'Admin') {
                        this.router.navigate(["admin"]);
                    } else {
                        this.router.navigate(["dashboard"]);
                    }
                },
                error => {
                    this.error_message = error._body;
                });
    }
}