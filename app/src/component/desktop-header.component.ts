import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppCache } from '../app.cache';
import { User } from '../model/user';

@Component({
    selector: 'desktop-header',
    templateUrl: '../template/desktop-header.html',
    styleUrls: ['../assets/css/desktop-header.css']
})
export class DesktopHeaderComponent {
    loginUser: User;

    constructor(private route: ActivatedRoute, private router: Router, private appCache: AppCache) {
        this.loginUser = appCache.loginUser;
    }

    protected showApplications() {
        this.router.navigate(['applications'], { relativeTo: this.route });
    }

    protected logout() {
        this.appCache.loginUser = null;
        this.router.navigate(['login']);
    }
}