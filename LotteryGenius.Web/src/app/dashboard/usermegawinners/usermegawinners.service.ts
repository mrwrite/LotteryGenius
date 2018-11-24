import { Injectable } from '@angular/core';
import { MegamillionsService } from '../../shared/megamillions.service';
import { Subject } from 'rxjs';
import { MegaWinnerViewModel } from '../../viewmodels/megawinnerviewmodel';
import { UserService } from '../../shared/user.service';
import { User } from '../../models/user';

@Injectable()
export class UsermegawinnersService {
    public user: User;
    public megaWinners$ = new Subject<Array<MegaWinnerViewModel>>();

    constructor(private megamillionsService: MegamillionsService,
        private userService: UserService) {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_user_mega_winners();
    }

    private get_user_mega_winners() {
        this.megamillionsService.show_user_winning_picks(parseInt(this.user.iat))
            .subscribe(data => this.megaWinners$.next(data));
    }

    public notify_change_in_mega_winners() {
        this.get_user_mega_winners();
    }
}