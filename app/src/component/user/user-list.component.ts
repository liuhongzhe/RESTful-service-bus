import { Component } from '@angular/core';
import { ListPageComponent } from '../list-page.component';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'user-list',
    templateUrl: '../template/user/user-list.html',
    styleUrls: ['../assets/css/list-page.css', '../assets/css/user/user-list.css'],
    providers: [UserService]
})
export class UserListComponent extends ListPageComponent<User> {
    constructor(private userService: UserService) {
        super(userService);
    }

    onSearch(text: string) {
        this.searchText = text;
        this.query();
    }
}