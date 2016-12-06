import { Component } from '@angular/core';
import { ListPageComponent } from '../list-page.component';
import { Admin } from '../../model/admin';
import { AdminService } from '../../service/admin.service';

@Component({
    selector: 'admin-list',
    templateUrl: '../template/admin/admin-list.html',
    styleUrls: ['../assets/css/list-page.css', '../assets/css/admin/admin-list.css'],
    providers: [AdminService]
})
export class AdminListComponent extends ListPageComponent<Admin> {
    constructor(private adminService: AdminService) {
        super(adminService);
    }
}