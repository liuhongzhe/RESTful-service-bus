import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: '../template/login.html',
    styleUrls: ['../assets/css/login.css']
})
export class LoginComponent {
    username: string;
    password: string;
    loading: boolean;
    loginFaild: boolean;
    constructor(private router: Router, private userService: UserService) { }
    passwordKeyUp(e) {
        if (e.which === 13) {
            this.login();
        }
    }
    login() {
        this.loginFaild = false;
        this.loading = true;
        this.userService.login(this.username, this.password).then(r => {
            if (r === null) {
                this.loginFaild = true;
            }
            else {

            }
            this.loading = false;
        });
    }
}