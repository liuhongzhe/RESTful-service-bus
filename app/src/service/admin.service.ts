import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { TService } from './service';
import { Admin } from '../model/admin';
import { Pagination } from '../entity/pagination';
import { QueryResult } from '../entity/query-result';

@Injectable()
export class AdminService extends TService<Admin> {
    constructor(protected http: Http) {
        super(http, 'admin');
    }

    queryByTextAndPagination(text: string = null, pagination: Pagination = null): Promise<QueryResult<Admin>> {
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
        return super.request<QueryResult<Admin>>(url, RequestMethod.Get);
    }

    login(username: string, password: string): Promise<Admin> {
        return new Promise<Admin>(resolve => {
            super.request<Admin>('admin/login', RequestMethod.Post, {
                username: username,
                password: password
            }).then(result => {
                resolve(result);
            })
        });
    };
}