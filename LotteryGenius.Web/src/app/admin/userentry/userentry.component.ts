import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UserService } from '../../shared/user.service';
import { AccountService } from '../../shared/account.service';
import { AdminhomeService } from '../adminhome/adminhome.service';
import { User } from '../../models/user';
import { RegisterView } from '../../models/register.view';
import { Role } from '../../models/role';

@Component({
    selector: 'userentry',
    templateUrl: './userentry.component.html',
    styleUrls: ['./userentry.component.css']
})
export class UserentryComponent implements OnInit {
    user: User;
    newUser: RegisterView;
    roles: Array<Role>;

    constructor(public bsModalRef: BsModalRef,
        private userService: UserService,
        private accountService: AccountService,
        private adminhomeService: AdminhomeService) {
        this.newUser = new RegisterView();
        this.roles = new Array<Role>();
    }

    ngOnInit(): void {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.accountService.getRoles().subscribe(roles => {
            this.roles = roles;
        });
    }

    addUser(): void {
        this.accountService.add_user(this.newUser).subscribe(
            data => {
                this.bsModalRef.hide();
                this.adminhomeService.notify_change_in_users();
            });
    }
}