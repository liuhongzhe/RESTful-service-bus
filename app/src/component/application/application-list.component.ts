import { Component } from '@angular/core';
import { ListPageComponent } from '../list-page.component';
import { Application } from '../../model/application';
import { ApplicationService } from '../../service/application.service';

@Component({
    selector: 'application-list',
    templateUrl: '../template/application/application-list.html',
    styleUrls: ['../assets/css/list-page.css', '../assets/css/application/application-list.css'],
    providers: [ApplicationService]
})
export class ApplicationListComponent extends ListPageComponent<Application> {
    constructor(private applicationService: ApplicationService) {
        super(applicationService);
    }
}