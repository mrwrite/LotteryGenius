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
import { UserService } from "../../shared/user.service";
import { UserentryComponent } from "../userentry/userentry.component";
import { Router } from "@angular/router";
import { AdminhomeService } from './adminhome.service';
import { BsModalService } from 'ngx-bootstrap/modal';
var AdminhomeComponent = /** @class */ (function () {
    function AdminhomeComponent(userService, accountService, router, adminhomeService, modalService) {
        this.userService = userService;
        this.accountService = accountService;
        this.router = router;
        this.adminhomeService = adminhomeService;
        this.modalService = modalService;
        this.adminhomeService.notify_change_in_users();
    }
    AdminhomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.adminhomeService.users$.subscribe(function (data) {
            _this.users = data;
        });
    };
    AdminhomeComponent.prototype.open_new_user_modal = function () {
        var initialState = {
            title: 'Add User'
        };
        this.bsModalRef = this.modalService.show(UserentryComponent, { initialState: initialState });
    };
    AdminhomeComponent = __decorate([
        Component({
            selector: 'adminhome',
            templateUrl: './adminhome.component.html',
            styleUrls: ['./adminhome.component.css']
        }),
        __metadata("design:paramtypes", [UserService,
            AccountService,
            Router,
            AdminhomeService,
            BsModalService])
    ], AdminhomeComponent);
    return AdminhomeComponent;
}());
export { AdminhomeComponent };
//# sourceMappingURL=adminhome.component.js.map