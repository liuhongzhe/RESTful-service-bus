import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { DetailPageComponent } from '../detail-page.component';
import { Operation } from '../../model/operation';
import { OperationService } from '../../service/operation.service';
import { Service } from '../../model/service';
import { ServiceService } from '../../service/service.service';

@Component({
    selector: 'operation-detail',
    templateUrl: '../template/operation/operation-detail.html',
    styleUrls: ['../assets/css/detail-page.css', '../assets/css/operation/operation-detail.css'],
    providers: [OperationService]
})

export class OperationDetailComponent extends DetailPageComponent<Operation> {
    protected services: Service[];

    @Input('operationForm') private form: NgForm;
    @ViewChild('lgModal') private modal;
    @Output() saveCompleted: EventEmitter<Operation> = new EventEmitter<Operation>();

    constructor(private operationService: OperationService, private serviceService: ServiceService) {
        super(operationService);
    }

    protected beforeGetEntity(id: string): Promise<void> {
        return new Promise<void>(resolve => {
            this.serviceService.find().then(r => {
                var services = [];
                r.rows.forEach((item, index, items) => {
                    services.push(item);
                });
                this.services = services;
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

    protected getSaveCompleted(): EventEmitter<Operation> {
        return this.saveCompleted;
    }
}