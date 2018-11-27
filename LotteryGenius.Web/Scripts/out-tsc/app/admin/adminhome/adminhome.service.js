var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountService } from "../../shared/account.service";
import { UserService } from "../../shared/user.service";
var AdminhomeService = /** @class */ (function () {
    function AdminhomeService(accountService, userService) {
        this.accountService = accountService;
        this.userService = userService;
        this.users$ = new Subject();
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_users();
    }
    AdminhomeService.prototype.get_users = function () {
        var _this = this;
        this.accountService.getUsers().subscribe(function (data) { return _this.users$.next(data); });
    };
    AdminhomeService.prototype.notify_change_in_users = function () {
        this.get_users();
    };
    AdminhomeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AccountService,
            UserService])
    ], AdminhomeService);
    return AdminhomeService;
}());
export { AdminhomeService };
//# sourceMappingURL=adminhome.service.js.map