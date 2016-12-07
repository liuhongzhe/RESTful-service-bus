import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DesktopRoutingModule } from './desktop-routing.module';
import { DesktopIndexComponent } from '../component/desktop-index.component';
import { TextSearchComponent } from '../component/common/text-search.component';
import { AdminListComponent } from '../component/admin/admin-list.component';
import { AdminDetailComponent } from '../component/admin/admin-detail.component';
import { ApplicationListComponent } from '../component/application/application-list.component';
import { ApplicationDetailComponent } from '../component/application/application-detail.component';
import { ServiceListComponent } from '../component/service/service-list.component';
import { ServiceDetailComponent } from '../component/service/service-detail.component';
import { OperationListComponent } from '../component/operation/operation-list.component';
import { OperationDetailComponent } from '../component/operation/operation-detail.component';
import { UserListComponent } from '../component/user/user-list.component';
import { UserDetailComponent } from '../component/user/user-detail.component';
import { AdminService } from '../service/admin.service';
import { ApplicationService } from '../service/application.service';
import { ServiceService } from '../service/service.service';
import { OperationService } from '../service/operation.service';
import { UserService } from '../service/user.service';
import { AppCache } from '../app.cache';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule,
        DesktopRoutingModule
    ],
    declarations: [
        PaginationComponent,
        TextSearchComponent,
        DesktopIndexComponent,
        AdminListComponent,
        AdminDetailComponent,
        ApplicationListComponent,
        ApplicationDetailComponent,
        ServiceListComponent,
        ServiceDetailComponent,
        OperationListComponent,
        OperationDetailComponent,
        UserListComponent,
        UserDetailComponent
    ],
    providers: [
        AdminService,
        ApplicationService,
        ServiceService,
        OperationService,
        UserService,
        AppCache
    ]
})
export class DesktopModule { }