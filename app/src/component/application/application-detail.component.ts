import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { DetailPageComponent } from '../detail-page.component';
import { Application } from '../../model/application';
import { ApplicationService } from '../../service/application.service';

@Component({
    selector: 'application-detail',
    templateUrl: '../template/application/application-detail.html',
    styleUrls: ['../assets/css/detail-page.css', '../assets/css/application/application-detail.css'],
    providers: [ApplicationService]
})
export class ApplicationDetailComponent extends DetailPageComponent<Application> {
    @Input('applicationForm') private form: NgForm;
    @ViewChild('lgModal') private modal;
    @Output() saveCompleted: EventEmitter<Application> = new EventEmitter<Application>();

    constructor(private applicationService: ApplicationService) {
        super(applicationService);
    }

    protected getModal(): ModalDirective {
        return this.modal;
    }

    protected getForm(): NgForm {
        return this.form;
    }

    protected getSaveCompleted(): EventEmitter<Application> {
        return this.saveCompleted;
    }
}