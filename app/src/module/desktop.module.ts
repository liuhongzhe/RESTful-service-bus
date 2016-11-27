import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { DesktopRoutingModule } from './desktop-routing.module';
import { ApplicationListComponent } from '../component/application/application-list.component';
import { ApplicationService } from '../service/application.service';
import { AppCache } from '../app.cache';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DesktopRoutingModule
    ],
    declarations: [
        PaginationComponent,
        ApplicationListComponent
    ],
    providers: [
        ApplicationService,
        AppCache
    ]
})
export class DesktopModule { }