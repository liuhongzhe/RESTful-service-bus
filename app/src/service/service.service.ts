import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TService } from './service';
import { Service } from '../model/service';

@Injectable()
export class ServiceService extends TService<Service> {
    constructor(protected http: Http) {
        super(http, 'service');
    }
}