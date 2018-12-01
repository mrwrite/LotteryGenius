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
import { User } from "../models/user";
import { Password } from "../models/password";
var PasswordChangeComponent = /** @class */ (function () {
    function PasswordChangeComponent(userService, accountService, router) {
        this.userService = userService;
        this.accountService = accountService;
        this.router = router;
        this.error = null;
        this.response = null;
        this.creds = {
            username: "",
            password: ""
        };
        this.jwtHelper = new JwtHelperService();
        this.password_change = new Password();
        this.user = new User();
    }
    PasswordChangeComponent.prototype.ngOnInit = function () {
        this.user = this.userService.get();
        if (this.user) {
            this.password_change.old_password = this.user.password;
            this.password_change.email = this.user.unique_name;
        }
    };
    PasswordChangeComponent.prototype.changePassword = function () {
        var _this = this;
        this.error = null;
        this.response = null;
        this.accountService.changePassword(this.password_change)
            .subscribe(function (data) {
            _this.response = data;
            _this.creds.username = _this.user.unique_name;
            _this.creds.password = _this.password_change.new_password;
            _this.accountService.login(_this.creds)
                .subscribe(function (data) {
                localStorage.setItem('token', data.token);
                _this.userService.set(_this.jwtHelper.decodeToken(data.token));
                var newUser = _this.userService.get();
                newUser.password = _this.creds.password;
                _this.userService.set(newUser);
                localStorage.setItem('user', JSON.stringify(_this.jwtHelper.decodeToken(data.token)));
                _this.router.navigate(["dashboard"]);
            }, function (error) {
                _this.error = error._body;
            });
        }, function (error) { _this.error = error; });
    };
    PasswordChangeComponent = __decorate([
        Component({
            selector: 'password-change',
            templateUrl: './password-change.component.html',
            styleUrls: ['./password-change.component.css']
        }),
        __metadata("design:paramtypes", [UserService, AccountService, Router])
    ], PasswordChangeComponent);
    return PasswordChangeComponent;
}());
export { PasswordChangeComponent };
//# sourceMappingURL=password-change.component.js.map