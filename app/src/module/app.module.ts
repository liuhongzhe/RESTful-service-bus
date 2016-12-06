import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { DesktopModule } from './desktop.module';
import { AppComponent } from '../component/app.component';
import { LoginComponent } from '../component/login.component';
import { DesktopHeaderComponent } from '../component/desktop-header.component';
import { DesktopComponent } from '../component/desktop.component';
import { AppCache } from '../app.cache';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        DesktopModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DesktopHeaderComponent,
        DesktopComponent
    ],
    providers: [
        AppCache
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }