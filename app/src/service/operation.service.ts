import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { TService } from './service';
import { Operation } from '../model/operation';
import { Pagination } from '../entity/pagination';
import { QueryResult } from '../entity/query-result';

@Injectable()
export class OperationService extends TService<Operation> {
    constructor(protected http: Http) {
        super(http, 'operation');
    }

    queryByTextAndPagination(text: string = null, pagination: Pagination = null): Promise<QueryResult<Operation>> {
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
        return super.request<QueryResult<Operation>>(url, RequestMethod.Get);
    }
}