import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TService } from './service';
import { Application } from '../model/application';

@Injectable()
export class ApplicationService extends TService<Application> {
    constructor(protected http: Http) {
        super(http, 'application');
    }
}