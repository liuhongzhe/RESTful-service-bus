import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TService } from './service';
import { Operation } from '../model/operation';

@Injectable()
export class OperationService extends TService<Operation> {
    constructor(protected http: Http) {
        super(http, 'operation');
    }
}