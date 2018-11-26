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
import { SettingsService } from '../../shared/settings.service';
import { AccountService } from '../../shared/account.service';
import { UserService } from "../../shared/user.service";
var HomesettingsService = /** @class */ (function () {
    function HomesettingsService(settingsService, accountService, userService) {
        this.settingsService = settingsService;
        this.accountService = accountService;
        this.userService = userService;
        this.userPlayer$ = new Subject();
        this.users$ = new Subject();
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_users();
        this.get_user_player();
    }
    HomesettingsService.prototype.get_user_player = function () {
        var _this = this;
        this.settingsService.get_user_player(parseInt(this.user.iat))
            .subscribe(function (data) { return _this.userPlayer$.next(data); });
    };
    HomesettingsService.prototype.get_users = function () {
        var _this = this;
        this.accountService.getUsers().subscribe(function (data) { return _this.users$.next(data); });
    };
    HomesettingsService.prototype.notify_change_in_user_player = function () {
        this.get_user_player();
    };
    HomesettingsService.prototype.notify_change_in_users = function () {
        this.get_users();
    };
    HomesettingsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SettingsService,
            AccountService,
            UserService])
    ], HomesettingsService);
    return HomesettingsService;
}());
export { HomesettingsService };
//# sourceMappingURL=homesettings.service.js.map