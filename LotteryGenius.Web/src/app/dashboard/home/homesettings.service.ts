import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserPlayer } from '../../models/userplayer';
import { SettingsService } from '../../shared/settings.service';
import { UserService } from "../../shared/user.service";
import { User } from "../../models/user";

@Injectable()
export class HomesettingsService {
    public user: User;
    public userPlayer$ = new Subject<UserPlayer>();

    constructor(private settingsService: SettingsService,
        private userService: UserService) {
        this.get_user_player();
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    }

    private get_user_player() {
        this.settingsService.get_user_player(parseInt(this.user.iat))
            .subscribe(data => this.userPlayer$.next(data));
    }

    public notify_change_in_user_player() {
        this.get_user_player();
    }
}