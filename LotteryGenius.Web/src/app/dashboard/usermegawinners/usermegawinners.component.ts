import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { NavigationStart, Router } from '@angular/router';
import { UserService } from "../../shared/user.service";
import { UsermegawinnersService } from './usermegawinners.service';
import { MegamillionsService } from '../../shared/megamillions.service';
import { User } from '../../models/user';
import { MegaWinnerViewModel } from '../../viewmodels/megawinnerviewmodel';
import { Subscription } from 'rxjs';

@Component({
    selector: 'usermegawinners',
    templateUrl: './usermegawinners.component.html',
    styleUrls: ['./usermegawinners.component.css']
})
export class UsermegawinnersComponent implements OnInit {
    public subscription: Subscription;
    public user: User;
    public winners: Array<MegaWinnerViewModel>;

    constructor(private usermegawinnersService: UsermegawinnersService,
        private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private megamillionService: MegamillionsService) {
        this.winners = new Array<MegaWinnerViewModel>();
        this.usermegawinnersService.notify_change_in_mega_winners();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.usermegawinnersService.megaWinners$.subscribe(data => {
            this.winners = data;
        });
    }

    checkWinner(ball: string, numbers: MegaWinnerViewModel, type: string) {
        let nWinners = Object.values(numbers);

        if (nWinners.indexOf(ball) !== -1) {
            nWinners = [];

            return "correct-circle";
        } else {
            nWinners = [];

            if (type === "megaball") {
                return "megamillions-circle";
            }
            return "circle";
        }
    }
}