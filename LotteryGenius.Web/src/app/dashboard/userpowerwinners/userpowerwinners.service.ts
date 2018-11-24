import { Injectable } from '@angular/core';
import { PowerballService } from '../../shared/powerball.service';
import { Subject } from 'rxjs';
import { PowerWinnerViewModel } from '../../viewmodels/powerwinnerviewmodel';
import { UserService } from '../../shared/user.service';
import { User } from '../../models/user';

@Injectable()
export class UserpowerwinnersService {
    public user: User;
    public powerWinners$ = new Subject<Array<PowerWinnerViewModel>>();

    constructor(private powerballService: PowerballService, private userService: UserService) {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_power_winners();
    }

    private get_user_power_winners() {
        this.powerballService.show_user_winning_picks(parseInt(this.user.iat))
            .subscribe(data => this.powerWinners$.next(data));
    }

    public notify_change_in_power_winners() {
        this.get_user_power_winners();
    }
}