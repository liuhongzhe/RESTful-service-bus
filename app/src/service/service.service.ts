import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { TService } from './service';
import { Service } from '../model/service';
import { Pagination } from '../entity/pagination';
import { QueryResult } from '../entity/query-result';

@Injectable()
export class ServiceService extends TService<Service> {
    constructor(protected http: Http) {
        super(http, 'service');
    }

    queryByTextAndPagination(text: string = null, pagination: Pagination = null): Promise<QueryResult<Service>> {
        var url = this.modelName + '?';
        if (text) {
            url += '&text=' + text;
        }
        if (pagination) {
            if (pagination.size) {
                url += '&size=' + pagination.size;
            }
            if (pagination.index) {
                url += '&index=' + pagination.index;
            }
        }
        return super.request<QueryResult<Service>>(url, RequestMethod.Get);
    }
}