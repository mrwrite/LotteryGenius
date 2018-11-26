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
import { UserpowerwinnersService } from './userpowerwinners.service';
import { PowerballService } from '../../shared/powerball.service';
export var browserRefresh = false;
var UserpowerwinnersComponent = /** @class */ (function () {
    function UserpowerwinnersComponent(userpowerwinnersService, accountService, userService, router, powerballService) {
        this.userpowerwinnersService = userpowerwinnersService;
        this.accountService = accountService;
        this.userService = userService;
        this.router = router;
        this.powerballService = powerballService;
        this.winners = new Array();
        this.userpowerwinnersService.notify_change_in_power_winners();
    }
    UserpowerwinnersComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.userpowerwinnersService.powerWinners$.subscribe(function (data) {
            _this.winners = data;
        });
    };
    UserpowerwinnersComponent.prototype.checkWinner = function (ball, numbers, type) {
        var nWinners = Object.values(numbers);
        if (nWinners.indexOf(ball) !== -1) {
            nWinners = [];
            return "correct-circle";
        }
        else {
            nWinners = [];
            if (type === "powerball") {
                return "powerball-circle";
            }
            return "circle";
        }
    };
    UserpowerwinnersComponent = __decorate([
        Component({
            selector: 'userpowerwinners',
            templateUrl: './userpowerwinners.component.html',
            styleUrls: ['./userpowerwinners.component.css']
        }),
        __metadata("design:paramtypes", [UserpowerwinnersService,
            AccountService,
            UserService,
            Router,
            PowerballService])
    ], UserpowerwinnersComponent);
    return UserpowerwinnersComponent;
}());
export { UserpowerwinnersComponent };
//# sourceMappingURL=userpowerwinners.component.js.map