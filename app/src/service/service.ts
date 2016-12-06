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

export abstract class TService<T extends Model> extends Service {
    constructor(protected http: Http, protected modelName: string) {
        super(http);
    }

    abstract queryByTextAndPagination(text: string, pagination: Pagination): Promise<QueryResult<T>>;

    queryByPk(pk: string) {
        var url = this.modelName + '/' + pk;
        return super.request<T>(url, RequestMethod.Get);
    }

    add(model: T) {
        var url = this.modelName;
        return super.request(url, RequestMethod.Post, model);
    }

    update(model: T) {
        var url = this.modelName + '/' + model.guid;
        return super.request(url, RequestMethod.Put, model);
    }

    deleteByPk(pk: string) {
        var url = this.modelName + '/' + pk;
        return super.request(url, RequestMethod.Delete);
    }
}