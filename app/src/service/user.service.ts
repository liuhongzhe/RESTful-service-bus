import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { TService } from './service';
import { User } from '../model/user';
import { Pagination } from '../entity/pagination';
import { QueryResult } from '../entity/query-result';

@Injectable()
export class UserService extends TService<User> {
    constructor(protected http: Http) {
        super(http, 'user');
    }

    queryByTextAndPagination(text: string = null, pagination: Pagination = null): Promise<QueryResult<User>> {
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
        return super.request<QueryResult<User>>(url, RequestMethod.Get);
    }

    login(username: string, password: string): Promise<User> {
        return new Promise<User>(resolve => {
            super.request<User>('user/login', RequestMethod.Post, {
                username: username,
                password: password
            }).then(result => {
                resolve(result);
            })
        });
    };
}