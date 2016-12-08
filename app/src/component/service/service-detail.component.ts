import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { DetailPageComponent } from '../detail-page.component';
import { Service } from '../../model/service';
import { ServiceService } from '../../service/service.service';
import { Application } from '../../model/application';
import { ApplicationService } from '../../service/application.service';

@Component({
    selector: 'service-detail',
    templateUrl: '../template/service/service-detail.html',
    styleUrls: ['../assets/css/detail-page.css', '../assets/css/service/service-detail.css'],
    providers: [ServiceService]
})

export class ServiceDetailComponent extends DetailPageComponent<Service> {
    protected applications: Application[];

    @Input('serviceForm') private form: NgForm;
    @ViewChild('lgModal') private modal;
    @Output() saveCompleted: EventEmitter<Service> = new EventEmitter<Service>();

    constructor(private serviceService: ServiceService, private applicationService: ApplicationService) {
        super(serviceService);
    }

    protected beforeGetEntity(guid: string): Promise<void> {
        return new Promise<void>(resolve => {
            this.applicationService.queryByTextAndPagination().then(r => {
                var applications = [];
                r.rows.forEach((item, index, items) => {
                    applications.push(item);
                });
                this.applications = applications;
                resolve();
            });
        });
    };

    protected getModal(): ModalDirective {
        return this.modal;
    }

    protected getForm(): NgForm {
        return this.form;
    }

    protected getSaveCompleted(): EventEmitter<Service> {
        return this.saveCompleted;
    }
}