import { Component } from '@angular/core';
import { ListPageComponent } from '../list-page.component';
import { Operation } from '../../model/operation';
import { OperationService } from '../../service/operation.service';

@Component({
    selector: 'operation-list',
    templateUrl: '../template/operation/operation-list.html',
    styleUrls: ['../assets/css/list-page.css', '../assets/css/operation/operation-list.css'],
    providers: [OperationService]
})
export class OperationListComponent extends ListPageComponent<Operation> {
    constructor(private operationService: OperationService) {
        super(operationService);
    }
}