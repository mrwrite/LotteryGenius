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
import { AccountService } from "../shared/account.service";
import { UserService } from "../shared/user.service";
import { PowerballService } from "../shared/powerball.service";
import { MegamillionsService } from "../shared/megamillions.service";
import { Router } from "@angular/router";
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(userService, accountService, router, powerballService, megamillionsService) {
        this.userService = userService;
        this.accountService = accountService;
        this.router = router;
        this.powerballService = powerballService;
        this.megamillionsService = megamillionsService;
        this.today = Date.now();
        this.isExpanded = false;
        this.all_powerball_picks = new Array();
        this.all_megamillions_picks = new Array();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.accountService.getUsers().subscribe(function (data) { return _this.users = data; });
        if (!this.user) {
            this.router.navigate([""]);
        }
        else {
            if (this.user.initialLogin === 'True') {
                this.router.navigate(["change-password"]);
            }
            else {
                this.role = this.user.role;
            }
        }
        this.powerballService.get_all_powerball_picks().subscribe(function (data) {
            _this.all_powerball_picks = data;
        });
        this.megamillionsService.get_all_megamillions_picks().subscribe(function (data) {
            _this.all_megamillions_picks = data;
        });
    };
    DashboardComponent.prototype.logout = function () {
        this.accountService.logout();
        this.router.navigate([""]);
    };
    DashboardComponent = __decorate([
        Component({
            selector: 'dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        }),
        __metadata("design:paramtypes", [UserService,
            AccountService,
            Router,
            PowerballService,
            MegamillionsService])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map