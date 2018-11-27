var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AccountService } from "../shared/account.service";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, userService, router) {
        this.auth = auth;
        this.userService = userService;
        this.router = router;
        this.creds = {
            username: "",
            password: ""
        };
        this.error_message = "";
        this.jwtHelperService = new JwtHelperService();
    }
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        var response = this.auth.login(this.creds)
            .subscribe(function (data) {
            localStorage.setItem('token', data.token);
            _this.userService.set(_this.jwtHelperService.decodeToken(data.token));
            var newUser = _this.userService.get();
            newUser.password = _this.creds.password;
            _this.userService.set(newUser);
            localStorage.setItem('user', JSON.stringify(_this.jwtHelperService.decodeToken(data.token)));
            if (newUser.role === 'Admin') {
                _this.router.navigate(["admin"]);
            }
            else {
                _this.router.navigate(["dashboard"]);
            }
        }, function (error) {
            _this.error_message = error._body;
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [AccountService, UserService, Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map