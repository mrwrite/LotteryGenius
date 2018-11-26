import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserPlayer } from '../../models/userplayer';
import { UserView } from '../../models/user.view';
import { SettingsService } from '../../shared/settings.service';
import { AccountService } from '../../shared/account.service';
import { UserService } from "../../shared/user.service";
import { User } from "../../models/user";

@Injectable()
export class HomesettingsService {
    public user: User;
    public userPlayer$ = new Subject<UserPlayer>();
    public users$ = new Subject<Array<UserView>>();

    constructor(private settingsService: SettingsService,
        private accountService: AccountService,
        private userService: UserService) {
        let newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_users();
        this.get_user_player();
    }

    private get_user_player() {
        this.settingsService.get_user_player(parseInt(this.user.iat))
            .subscribe(data => this.userPlayer$.next(data));
    }

    private get_users() {
        this.accountService.getUsers().subscribe(data => this.users$.next(data));
    }

    public notify_change_in_user_player() {
        this.get_user_player();
    }

    public notify_change_in_users() {
        this.get_users();
    }
}