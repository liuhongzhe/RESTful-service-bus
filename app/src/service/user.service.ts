import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { TService } from './service';
import { User } from '../model/user';

@Injectable()
export class UserService extends TService<User> {
    constructor(protected http: Http) {
        super(http, 'user');
    }

    login(username: string, password: string): Promise<User> {
        return new Promise<User>(resolve => {
            super.requestJson<User>('user/login', RequestMethod.Post, {
                username: username,
                password: password
            }).then(result => {
                resolve(result);
            })
        });
    };
}