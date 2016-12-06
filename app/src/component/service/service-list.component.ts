import { Component } from '@angular/core';
import { ListPageComponent } from '../list-page.component';
import { Service } from '../../model/service';
import { ServiceService } from '../../service/service.service';

@Component({
    selector: 'service-list',
    templateUrl: '../template/service/service-list.html',
    styleUrls: ['../assets/css/list-page.css', '../assets/css/service/service-list.css'],
    providers: [ServiceService]
})
export class ServiceListComponent extends ListPageComponent<Service> {
    constructor(private serviceService: ServiceService) {
        super(serviceService);
    }

    getQueryFunction(): Function {
        return this.serviceService.queryByTextAndPagination;
    }

    onSearch(text: string) {
        this.searchText = text;
        this.query();
    }
}