import * as express from 'express';
import * as Sequelize from 'sequelize';
import { TController } from './controller';
import { ApplicationModel } from '../storage/model/application-model';
import { ApplicationInstance } from '../storage/instance/application-instance';
import { ApplicationAttribute } from '../storage/attribute/application-attribute';

export class ApplicationController extends TController<ApplicationModel, ApplicationInstance, ApplicationAttribute> {
    find(req: express.Request, res: express.Response) {
        let searchText = this.getRequestSearchText(req);
        let findOptions: Sequelize.FindOptions = {};
        findOptions = this.buildPaginationFindOptions(req, findOptions);
        if (searchText && searchText !== '') {
            findOptions.where = {
                '$or': [
                    {
                        name: {
                            '$like': '%' + searchText + '%'
                        }
                    },
                    {
                        no: {
                            '$like': '%' + searchText + '%'
                        }
                    }
                ]
            };
        }
        this.model.findAndCountAll(findOptions).then(r => {
            res.send(r);
        }).catch(e => {
            throw 'Query error. Error:' + e;
        });
    }
}