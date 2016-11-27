import { Headers, Http, Request, RequestMethod } from '@angular/http';
import { AppConfig } from '../app.config';
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

export abstract class TService<T> extends Service {
    constructor(protected http: Http, protected modelName: string) {
        super(http);
    }

    queryByPagination(pagination: Pagination): Promise<QueryResult<T>> {
        return new Promise<QueryResult<T>>(resolve => {
            var url = this.modelName + '?index=' + pagination.index + '&size=' + pagination.size;
            super.request<QueryResult<T>>(url, RequestMethod.Get).then(r => {
                console.debug('Debug: QueryByPagination ok. Return:' + JSON.stringify(r));
                resolve(r);
            }).catch(e => {
                console.error('Error: ' + e);
            });
        });
    }

    deleteByPk(pk: string) {
        return new Promise<boolean>(resolve => {
            var url = AppConfig.serviceUrlRoot + '/' + this.modelName;
            super.request(url, RequestMethod.Post).then(r => {
                console.debug('Debug: DeleteByPk ok. Return:' + JSON.stringify(r));
                resolve(true);
            }).catch(e => {
                console.error('Error: ' + e);
                resolve(false);
            });
        });
    }
}