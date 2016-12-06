import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { DetailPageComponent } from '../detail-page.component';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'user-detail',
    templateUrl: '../template/user/user-detail.html',
    styleUrls: ['../assets/css/detail-page.css', '../assets/css/user/user-detail.css'],
    providers: [UserService]
})
export class UserDetailComponent extends DetailPageComponent<User> {
    @Input('userForm') private form: NgForm;
    @ViewChild('lgModal') private modal;
    @Output() saveCompleted: EventEmitter<User> = new EventEmitter<User>();

    constructor(private userService: UserService) {
        super(userService);
    }

    protected getModal(): ModalDirective {
        return this.modal;
    }

    protected getForm(): NgForm {
        return this.form;
    }

    protected getSaveCompleted(): EventEmitter<User> {
        return this.saveCompleted;
    }
}