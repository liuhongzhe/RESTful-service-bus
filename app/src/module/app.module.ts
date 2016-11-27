import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../component/app.component';

const routes: Routes = [
    { path: '', component: AppComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }