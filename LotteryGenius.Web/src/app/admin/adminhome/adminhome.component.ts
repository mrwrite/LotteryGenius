import { Component, OnInit, TemplateRef } from '@angular/core';
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
    public user_id_to_delete: number = -1;
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

    open_delete_modal(template: TemplateRef<any>, user_id: string) {
        this.user_id_to_delete = parseInt(user_id);
        this.bsModalRef = this.modalService.show(template, { class: 'modal-sm', ignoreBackdropClick: true });
    }

    deleteUser() {
        this.accountService.deleteUser(this.user_id_to_delete).subscribe(data => {
            this.bsModalRef.hide();
            this.adminhomeService.notify_change_in_users();
        });
    }

    resetUserPassword(id: number) {
        this.accountService.resetUserPassword(id).subscribe(data => {
            this.adminhomeService.notify_change_in_users();
        });
    }
}