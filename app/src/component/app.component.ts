import { Component, ViewContainerRef } from '@angular/core';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    public constructor(private componentsHelper: ComponentsHelper, private viewContainerRef: ViewContainerRef) {
        componentsHelper.setRootViewContainerRef(viewContainerRef);
    }
}