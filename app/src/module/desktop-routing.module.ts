import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from '../component/desktop.component';
import { DesktopIndexComponent } from '../component/desktop-index.component';
import { AdminListComponent } from '../component/admin/admin-list.component';
import { ApplicationListComponent } from '../component/application/application-list.component';
import { ServiceListComponent } from '../component/service/service-list.component';
import { OperationListComponent } from '../component/operation/operation-list.component';
import { UserListComponent } from '../component/user/user-list.component';

const desktopRoutes: Routes = [
    {
        path: 'desktop',
        component: DesktopComponent,
        children: [
            { path: '', component: DesktopIndexComponent },
            { path: 'application', component: ApplicationListComponent },
            { path: 'service', component: ServiceListComponent },
            { path: 'operation', component: OperationListComponent },
            { path: 'admin', component: AdminListComponent },
            { path: 'user', component: UserListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(desktopRoutes)],
    exports: [RouterModule]
})
export class DesktopRoutingModule { }