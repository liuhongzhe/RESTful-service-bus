import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from '../component/desktop.component';
import { ApplicationListComponent } from '../component/application/application-list.component';

const desktopRoutes: Routes = [
    {
        path: 'desktop',
        component: DesktopComponent,
        children: [
            { path: 'applications', component: ApplicationListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(desktopRoutes)],
    exports: [RouterModule]
})
export class DesktopRoutingModule { }