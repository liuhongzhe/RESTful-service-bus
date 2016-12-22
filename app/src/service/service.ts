import { Headers, Http, Request, RequestMethod } from '@angular/http';
import { AppConfig } from '../app.config';
import { Model } from '../model/model';
import { User } from '../model/user';
import { Pagination } from '../entity/pagination';
import { QueryResult } from '../entity/query-result';

export abstract class Service {
    constructor(protected http: Http) {
        this.http = http;
    }

    requestText(path: string, method: RequestMethod, data: any = {}): Promise<string> {
        console.debug('Debug: Begin a text request. url:' + AppConfig.serviceUrlRoot + '/' + path + ';method:' + method + ';data:' + JSON.stringify(data));
        return new Promise<string>(resolve => {
            this.http.request(new Request({
                method: method,
                url: AppConfig.serviceUrlRoot + '/' + path,
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: data
            })).subscribe(r => {
                var bodyText = r.text();
                console.debug('Debug: Request text successful. Return:' + bodyText);
                resolve(bodyText);
            }, e => {
                throw 'Request text error: ' + e;
            });
        });
    }

    requestJson<T>(path: string, method: RequestMethod, data: any = {}): Promise<T> {
        console.debug('Debug: Begin a json request. url:' + AppConfig.serviceUrlRoot + '/' + path + ';method:' + method + ';data:' + JSON.stringify(data));
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
                console.debug('Debug: Request text successful. Return:' + bodyText);
                if (bodyText === '') {
                    resolve(null);
                }
                else {
                    resolve(<T>r.json());
                }
            }, e => {
                throw 'Request json error: ' + e;
            });
        });
    }
}

export abstract class TService<T extends Model> extends Service {
    constructor(protected http: Http, protected modelName: string) {
        super(http);
    }

    find(pagination: Pagination = null, text: string = null): Promise<QueryResult<T>> {
        var url = this.modelName + '?';
        if (text) {
            url += '&search-text=' + text;
        }
        if (pagination) {
            if (pagination.size) {
                url += '&size=' + pagination.size;
            }
            if (pagination.index) {
                url += '&index=' + pagination.index;
            }
        }
        return this.requestJson<QueryResult<T>>(url, RequestMethod.Get);
    }

    create(model: T): Promise<string> {
        var url = this.modelName;
        return this.requestText(url, RequestMethod.Post, model);
    }

    update(model: T): Promise<void> {
        var url = this.modelName + '/' + model.id;
        return this.requestJson<void>(url, RequestMethod.Put, model);
    }

    destroyById(id: string): Promise<void> {
        var url = this.modelName + '/' + id;
        return this.requestJson<void>(url, RequestMethod.Delete);
    }

    findById(id: string): Promise<T> {
        var url = this.modelName + '/' + id;
        return this.requestJson<T>(url, RequestMethod.Get);
    }
}