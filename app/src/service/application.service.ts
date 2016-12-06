import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { TService } from './service';
import { Application } from '../model/application';
import { Pagination } from '../entity/pagination';
import { QueryResult } from '../entity/query-result';

@Injectable()
export class ApplicationService extends TService<Application> {
    constructor(protected http: Http) {
        super(http, 'application');
    }

    queryByTextAndPagination(text: string = null, pagination: Pagination = null): Promise<QueryResult<Application>> {
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
        return super.request<QueryResult<Application>>(url, RequestMethod.Get);
    }
}