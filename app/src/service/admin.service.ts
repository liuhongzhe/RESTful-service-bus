import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { TService } from './service';
import { Admin } from '../model/admin';

@Injectable()
export class AdminService extends TService<Admin> {
    constructor(protected http: Http) {
        super(http, 'admin');
    }

    login(username: string, password: string): Promise<Admin> {
        return new Promise<Admin>(resolve => {
            this.requestJson<Admin>('admin/login', RequestMethod.Post, {
                username: username,
                password: password
            }).then(result => {
                resolve(result);
            })
        });
    };
}