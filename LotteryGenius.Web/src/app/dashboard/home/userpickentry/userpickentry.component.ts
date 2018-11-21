import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';

import { UserService } from '../../../shared/user.service';
import { AccountService } from '../../../shared/account.service';
import { PowerballService } from '../../../shared/powerball.service';
import { MegamillionsService } from '../../../shared/megamillions.service';
import { UserpowerpicksService } from '../../userpowerpicks/userpowerpicks.service';
import { UsermegapicksService } from '../../usermegapicks/usermegapicks.service';
import { User } from '../../../models/user';
import { UserPick } from '../../../models/userpick';

@Component({
    selector: 'app-userpickentry',
    templateUrl: './userpickentry.component.html',
    styleUrls: ['./userpickentry.component.css']
})
export class UserpickentryComponent implements OnInit {
    public user: User;
    userPick: UserPick;
    lottoball: string;
    lottogame: string;
    styles: any;

    constructor(public bsModalRef: BsModalRef, private userService: UserService,
        private accountService: AccountService,
        private powerballService: PowerballService,
        private megamillionsService: MegamillionsService,
        private userpowerpicksService: UserpowerpicksService,
        private usermegapicksService: UsermegapicksService) {
        this.userPick = new UserPick();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    }

    addUserPick(): void {
        this.userPick.user_id = parseInt(this.user.iat);

        if (this.lottogame === "Powerball") {
            this.userPick.game_type = 'powerball';
            this.powerballService.add_manual_user_pick(this.userPick).subscribe(data => {
                this.userpowerpicksService.notify_change_in_user_picks();
                this.bsModalRef.hide();
            });
        } else {
            this.userPick.game_type = 'megamillions';
            this.megamillionsService.add_manual_user_pick(this.userPick).subscribe(data => {
                this.usermegapicksService.notify_change_in_user_picks();
                this.bsModalRef.hide();
            });
        }
    }
}