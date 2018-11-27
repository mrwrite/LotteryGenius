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
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../shared/user.service';
import { AccountService } from '../../shared/account.service';
import { AdminhomeService } from '../adminhome/adminhome.service';
import { RegisterView } from '../../models/register.view';
var UserentryComponent = /** @class */ (function () {
    function UserentryComponent(bsModalRef, userService, accountService, adminhomeService) {
        this.bsModalRef = bsModalRef;
        this.userService = userService;
        this.accountService = accountService;
        this.adminhomeService = adminhomeService;
        this.newUser = new RegisterView();
        this.roles = new Array();
    }
    UserentryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.accountService.getRoles().subscribe(function (roles) {
            _this.roles = roles;
        });
    };
    UserentryComponent.prototype.addUser = function () {
        var _this = this;
        this.accountService.add_user(this.newUser).subscribe(function (data) {
            _this.bsModalRef.hide();
            _this.adminhomeService.notify_change_in_users();
        });
    };
    UserentryComponent = __decorate([
        Component({
            selector: 'userentry',
            templateUrl: './userentry.component.html',
            styleUrls: ['./userentry.component.css']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            UserService,
            AccountService,
            AdminhomeService])
    ], UserentryComponent);
    return UserentryComponent;
}());
export { UserentryComponent };
//# sourceMappingURL=userentry.component.js.map