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
import { UsermegawinnersService } from './usermegawinners.service';
import { MegamillionsService } from '../../shared/megamillions.service';
var UsermegawinnersComponent = /** @class */ (function () {
    function UsermegawinnersComponent(usermegawinnersService, accountService, userService, router, megamillionService) {
        this.usermegawinnersService = usermegawinnersService;
        this.accountService = accountService;
        this.userService = userService;
        this.router = router;
        this.megamillionService = megamillionService;
        this.winners = new Array();
        this.usermegawinnersService.notify_change_in_mega_winners();
    }
    UsermegawinnersComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.usermegawinnersService.megaWinners$.subscribe(function (data) {
            _this.winners = data;
        });
    };
    UsermegawinnersComponent.prototype.checkWinner = function (ball, numbers, type) {
        var nWinners = Object.values(numbers);
        if (nWinners.indexOf(ball) !== -1) {
            nWinners = [];
            return "correct-circle";
        }
        else {
            nWinners = [];
            if (type === "megaball") {
                return "megamillions-circle";
            }
            return "circle";
        }
    };
    UsermegawinnersComponent = __decorate([
        Component({
            selector: 'usermegawinners',
            templateUrl: './usermegawinners.component.html',
            styleUrls: ['./usermegawinners.component.css']
        }),
        __metadata("design:paramtypes", [UsermegawinnersService,
            AccountService,
            UserService,
            Router,
            MegamillionsService])
    ], UsermegawinnersComponent);
    return UsermegawinnersComponent;
}());
export { UsermegawinnersComponent };
//# sourceMappingURL=usermegawinners.component.js.map