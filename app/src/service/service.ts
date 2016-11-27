import { BaseRequestOptions, Headers, Http, Request, RequestMethod } from '@angular/http';
import { AppConfig } from '../app.config';
import { User } from '../model/user';

export abstract class Service {
    constructor(protected http: Http) {
        this.http = http;
    }
    request<T>(path: string, method: RequestMethod, data: any = {}): Promise<T> {
        console.debug('Debug: Begin a request.url:' + AppConfig.serviceUrlRoot + '/' + path + ';method:' + method + ';data:' + JSON.stringify(data));
        return new Promise<T>(resolve => {
            this.http.request(new Request({
                method: method,
                url: AppConfig.serviceUrlRoot + '/' + path,
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: data
            })).subscribe(r => {
                var bodyText = r.text();
                console.debug('Debug: Request ok. Return:' + bodyText);
                if (bodyText === '') {
                    resolve(null);
                }
                else {
                    resolve(<T>r.json());
                }
            }, e => {
                console.error('Error: ' + e);
            });
        });
    }
}