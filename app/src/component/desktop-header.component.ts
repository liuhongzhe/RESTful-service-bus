import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppCache } from '../app.cache';
import { LoginType } from '../entity/login-type';
import { Admin } from '../model/admin';

@Component({
    selector: 'desktop-header',
    templateUrl: '../template/desktop-header.html',
    styleUrls: ['../assets/css/desktop-header.css']
})
export class DesktopHeaderComponent {
    login: Admin;

    constructor(private router: Router, private appCache: AppCache) {
        switch (appCache.loginType) {
            case LoginType.User:
                this.login = appCache.loginUser;
                break;
            case LoginType.Admin:
                this.login = appCache.loginAdmin;
                break;
        }
    }

    protected logout() {
        switch (this.appCache.loginType) {
            case LoginType.User:
                this.appCache.loginUser = null;
                this.router.navigate(['login', { loginType: LoginType.User }]);
                break;
            case LoginType.Admin:
                this.appCache.loginAdmin = null;
                this.router.navigate(['login', { loginType: LoginType.Admin }]);
                break;
        }
    }
}