import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../shared/account.service";
import { NavigationStart, Router } from '@angular/router';
import { UserService } from "../../shared/user.service";
import { UserpowerwinnersService } from './userpowerwinners.service';
import { PowerballService } from '../../shared/powerball.service';
import { User } from '../../models/user';
import { PowerWinnerViewModel } from '../../viewmodels/powerwinnerviewmodel';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
    selector: 'userpowerwinners',
    templateUrl: './userpowerwinners.component.html',
    styleUrls: ['./userpowerwinners.component.css']
})
export class UserpowerwinnersComponent implements OnInit {
    public subscription: Subscription;
    public user: User;
    public winners: Array<PowerWinnerViewModel>;

    constructor(private userpowerwinnersService: UserpowerwinnersService,
        private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private powerballService: PowerballService) {
        this.winners = new Array<PowerWinnerViewModel>();
        this.userpowerwinnersService.notify_change_in_power_winners();
    }

    ngOnInit() {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.userpowerwinnersService.powerWinners$.subscribe(data => {
            this.winners = data;
        });
    }

    checkWinner(ball: string, numbers: PowerWinnerViewModel, type: string) {
        let nWinners = Object.values(numbers);

        if (nWinners.indexOf(ball) !== -1) {
            nWinners = [];

            return "correct-circle";
        } else {
            nWinners = [];
            if (type === "powerball") {
                return "powerball-circle";
            }
            return "circle";
        }
    }
}