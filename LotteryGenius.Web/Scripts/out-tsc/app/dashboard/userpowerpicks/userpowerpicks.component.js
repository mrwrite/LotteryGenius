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
import { AccountService } from "../../shared/account.service";
import { Router } from '@angular/router';
import { UserService } from "../../shared/user.service";
import { UserpowerpicksService } from './userpowerpicks.service';
import { PowerballService } from '../../shared/powerball.service';
export var browserRefresh = false;
var UserpowerpicksComponent = /** @class */ (function () {
    function UserpowerpicksComponent(userpowerpicksService, accountService, userService, router, powerballService) {
        this.userpowerpicksService = userpowerpicksService;
        this.accountService = accountService;
        this.userService = userService;
        this.router = router;
        this.powerballService = powerballService;
        this.selectAll = false;
        this.showSendNumbers = false;
        this.userPicks = new Array();
        this.userpowerpicksService.notify_change_in_user_picks();
    }
    UserpowerpicksComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.userpowerpicksService.userPicks$.subscribe(function (data) {
            _this.userPicks = data;
        });
    };
    UserpowerpicksComponent.prototype.updateCheck = function () {
        if (this.selectAll === true) {
            this.userPicks.map(function (picks) {
                picks.checked = true;
            });
        }
        else {
            this.userPicks.map(function (picks) {
                picks.checked = false;
            });
        }
        this.selectCheck();
    };
    UserpowerpicksComponent.prototype.selectCheck = function () {
        var count = this.userPicks.filter(function (item) { return item.checked === true; })
            .reduce(function (sum, current) { return sum + 1; }, 0);
        if (count >= 1) {
            this.showSendNumbers = true;
        }
        else {
            this.showSendNumbers = false;
        }
    };
    UserpowerpicksComponent = __decorate([
        Component({
            selector: 'userpowerpicks',
            templateUrl: './userpowerpicks.component.html',
            styleUrls: ['./userpowerpicks.component.css']
        }),
        __metadata("design:paramtypes", [UserpowerpicksService,
            AccountService,
            UserService,
            Router,
            PowerballService])
    ], UserpowerpicksComponent);
    return UserpowerpicksComponent;
}());
export { UserpowerpicksComponent };
//# sourceMappingURL=userpowerpicks.component.js.map