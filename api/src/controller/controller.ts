import * as express from 'express';
import * as Sequelize from 'sequelize';
import { ApiCache } from '../api.cache';
import { RsbStorage } from '../storage/rsb-storage';
import { Pagination } from '../entity/pagination';
import { Attribute } from '../storage/attribute/attribute';

export abstract class Controller {
    protected rsbStorage: RsbStorage;

    constructor() {
        this.rsbStorage = ApiCache.rsbStorage;
    }

    protected getRequestId(req: express.Request, idName: string = 'id'): string {
        return req.param(idName);
    }

    protected getRequestSearchText(req: express.Request, searchTextName: string = 'search-text'): string {
        return req.param(searchTextName);
    }

    protected buildPaginationFindOptions(req: express.Request, findOptions: Sequelize.FindOptions = null, sizeName: string = 'size', indexName: string = 'index'): Sequelize.FindOptions {
        let pagination: Pagination = {};
        let sizeString = req.param(sizeName);
        if (sizeString && sizeString !== '') {
            pagination.size = Number.parseInt(sizeString);
            if (!findOptions) {
                findOptions = {};
            }
            findOptions.limit = pagination.size;
            let indexString = req.param(indexName);
            if (indexString && indexString !== '') {
                pagination.index = Number.parseInt(indexString);
                findOptions.offset = pagination.size * (pagination.index - 1);
            }
        }
        return findOptions;
    }
}

export abstract class TController<TModel extends Sequelize.Model<TInstance, TAttribute>, TInstance extends Sequelize.Instance<TAttribute>, TAttribute extends Attribute> extends Controller {
    protected model: TModel;

    constructor(protected modelName: string) {
        super();
        if (this.rsbStorage.sequelize.isDefined(modelName)) {
            this.model = <TModel>this.rsbStorage.sequelize.model<TInstance, TAttribute>(modelName);
        }
        else {
            throw 'Model(' + modelName + ') undefined.';
        }
    }

    public create(req: express.Request, res: express.Response) {
        this.model.create(req.body).then(r => {
            res.send(r.toJSON().id);
        }).catch(e => {
            throw 'Create error. Error:' + e;
        });
    }

    public update(req: express.Request, res: express.Response) {
        let id = this.getRequestId(req);
        this.model.findById(id).then(r => {
            r.update(req.body).then(r => {
                res.send();
            }).catch(e => {
                throw 'Update(id:' + id + ') error. Error:' + e;
            });;
        }).catch(e => {
            throw 'FindById(id:' + id + ') error. Error:' + e;
        });
    }

    public destroyById(req: express.Request, res: express.Response) {
        let id = this.getRequestId(req);
        this.model.findById(id).then(r => {
            r.destroy().then(r => {
                res.send();
            }).catch(e => {
                throw 'Destroy(id:' + id + ') error. Error:' + e;
            });
        }).catch(e => {
            throw 'FindById(id:' + id + ') error. Error:' + e;
        });
    }

    public findById(req: express.Request, res: express.Response) {
        let id = this.getRequestId(req);
        this.model.findById(id).then(r => {
            res.send(r.toJSON());
        }).catch(e => {
            throw 'FindById(id:' + id + ') error. Error:' + e;
        });
    }
}