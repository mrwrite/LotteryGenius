import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { UserService } from "../../shared/user.service";
import { UserentryComponent } from "../userentry/userentry.component";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { UserView } from "../../models/user.view";
import { AdminhomeService } from './adminhome.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'adminhome',
    templateUrl: './adminhome.component.html',
    styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
    public user: User;
    public users: UserView[];
    public role: string;
    bsModalRef: BsModalRef;

    constructor(private userService: UserService,
        private accountService: AccountService,
        private router: Router,
        private adminhomeService: AdminhomeService,
        private modalService: BsModalService) {
        this.adminhomeService.notify_change_in_users();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.adminhomeService.users$.subscribe(data => {
            this.users = data;
        });
    }

    open_new_user_modal() {
        const initialState = {
            title: 'Add User'
        };

        this.bsModalRef = this.modalService.show(UserentryComponent, { initialState });
    }
}