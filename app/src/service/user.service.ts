import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { Service } from './service';
import { User } from '../model/user';

@Injectable()
export class UserService extends Service {
    constructor(protected http: Http) {
        super(http);
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