import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { UserService } from '../service/user.service';
import { AppCache } from '../app.cache';
import { LoginType } from '../entity/login-type';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: '../template/login.html',
    styleUrls: ['../assets/css/login.css']
})
export class LoginComponent {
    userLoginTypeString: string = LoginType.User.toString();
    adminLoginTypeString: string = LoginType.Admin.toString();
    loginType: string = LoginType.User.toString();
    username: string;
    password: string;
    loading: boolean;
    loginFaild: boolean;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private adminService: AdminService, private userService: UserService, private appCache: AppCache) {
        activatedRoute.params.subscribe(params => {
            var loginType = params['loginType'];
            if (loginType) {
                this.loginType = loginType;
            }
        });
    }

    passwordKeyUp(e) {
        if (e.which === 13) {
            this.login();
        }
    }

    login() {
        this.loginFaild = false;
        this.loading = true;
        if (this.loginType === this.userLoginTypeString) {
            this.userService.login(this.username, this.password).then(r => {
                if (r === null) {
                    this.loginFaild = true;
                }
                else {
                    this.appCache.loginType = LoginType.User;
                    this.appCache.loginUser = r;
                    this.router.navigate(['desktop']);
                }
                this.loading = false;
            });
        }
        else if (this.loginType === this.adminLoginTypeString) {
            this.adminService.login(this.username, this.password).then(r => {
                if (r === null) {
                    this.loginFaild = true;
                }
                else {
                    this.appCache.loginType = LoginType.Admin;
                    this.appCache.loginAdmin = r;
                    this.router.navigate(['desktop']);
                }
                this.loading = false;
            });
        }
    }
}