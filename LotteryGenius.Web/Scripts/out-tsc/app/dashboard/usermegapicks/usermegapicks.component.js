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
import { UsermegapicksService } from './usermegapicks.service';
import { MegamillionsService } from '../../shared/megamillions.service';
var UsermegapicksComponent = /** @class */ (function () {
    function UsermegapicksComponent(usermegapicksService, accountService, userService, router, megamillionService) {
        this.usermegapicksService = usermegapicksService;
        this.accountService = accountService;
        this.userService = userService;
        this.router = router;
        this.megamillionService = megamillionService;
        this.selectAll = false;
        this.showSendNumbers = false;
        this.userPicks = new Array();
        this.usermegapicksService.notify_change_in_user_picks();
    }
    UsermegapicksComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.usermegapicksService.userPicks$.subscribe(function (data) {
            _this.userPicks = data;
        });
    };
    UsermegapicksComponent.prototype.updateCheck = function () {
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
    UsermegapicksComponent.prototype.selectCheck = function () {
        var count = this.userPicks.filter(function (item) { return item.checked === true; })
            .reduce(function (sum, current) { return sum + 1; }, 0);
        if (count >= 1) {
            this.showSendNumbers = true;
        }
        else {
            this.showSendNumbers = false;
        }
    };
    UsermegapicksComponent = __decorate([
        Component({
            selector: 'usermegapicks',
            templateUrl: './usermegapicks.component.html',
            styleUrls: ['./usermegapicks.component.css']
        }),
        __metadata("design:paramtypes", [UsermegapicksService,
            AccountService,
            UserService,
            Router,
            MegamillionsService])
    ], UsermegapicksComponent);
    return UsermegapicksComponent;
}());
export { UsermegapicksComponent };
//# sourceMappingURL=usermegapicks.component.js.map