import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { DetailPageComponent } from '../detail-page.component';
import { Admin } from '../../model/admin';
import { AdminService } from '../../service/admin.service';

@Component({
    selector: 'admin-detail',
    templateUrl: '../template/admin/admin-detail.html',
    styleUrls: ['../assets/css/detail-page.css', '../assets/css/admin/admin-detail.css'],
    providers: [AdminService]
})
export class AdminDetailComponent extends DetailPageComponent<Admin> {
    @Input('adminForm') private form: NgForm;
    @ViewChild('lgModal') private modal;
    @Output() saveCompleted: EventEmitter<Admin> = new EventEmitter<Admin>();

    constructor(private adminService: AdminService) {
        super(adminService);
    }

    protected beforeGetEntity(guid: string): Promise<void> {
        return new Promise<void>(r => {
            r();
        });
    };

    protected getModal(): ModalDirective {
        return this.modal;
    }

    protected getForm(): NgForm {
        return this.form;
    }

    protected getSaveCompleted(): EventEmitter<Admin> {
        return this.saveCompleted;
    }
}