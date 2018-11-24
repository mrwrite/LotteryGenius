import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { NavigationStart, Router } from '@angular/router';
import { UserService } from "../../shared/user.service";
import { UsermegapicksService } from './usermegapicks.service';
import { MegamillionsService } from '../../shared/megamillions.service';
import { User } from "../../models/user";
import { MegamillionsPick } from '../../models/megamillionpick';
import { UserPick } from '../../models/userpick';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

export let browserRefresh = false;

@Component({
    selector: 'usermegapicks',
    templateUrl: './usermegapicks.component.html',
    styleUrls: ['./usermegapicks.component.css']
})
export class UsermegapicksComponent implements OnInit {
    public subscription: Subscription;
    public user: User;
    public userPicks: Array<UserPick>;
    public selectAll: boolean = false;
    public showSendNumbers: boolean = false;
    bsModalRef: BsModalRef;
    public user_pick_id: number = -1;

    constructor(private usermegapicksService: UsermegapicksService,
        private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private megamillionService: MegamillionsService,
        private modalService: BsModalService) {
        this.userPicks = new Array<UserPick>();
        this.usermegapicksService.notify_change_in_user_picks();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.usermegapicksService.userPicks$.subscribe(data => {
            this.userPicks = data;
        });
    }

    updateCheck() {
        if (this.selectAll === true) {
            this.userPicks.map((picks) => {
                picks.checked = true;
            });
        } else {
            this.userPicks.map((picks) => {
                picks.checked = false;
            });
        }

        this.selectCheck();
    }

    selectCheck() {
        var count = this.userPicks.filter(item => item.checked === true)
            .reduce((sum, current) => sum + 1, 0);

        if (count >= 1) {
            this.showSendNumbers = true;
        } else {
            this.showSendNumbers = false;
        }
    }

    open_delete_modal(template: TemplateRef<any>, id: number) {
        this.user_pick_id = id;
        this.bsModalRef = this.modalService.show(template, { class: 'modal-sm', ignoreBackdropClick: true });
    }

    confirm_user_pick_delete() {
        this.megamillionService.delete_user_pick(this.user_pick_id).subscribe(data => {
            this.bsModalRef.hide();
            this.usermegapicksService.notify_change_in_user_picks();
        });
    }
}