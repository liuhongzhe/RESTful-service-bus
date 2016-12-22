import * as express from 'express';
import * as Sequelize from 'sequelize';
import { TController } from './controller';
import { ServiceModel } from '../storage/model/service-model';
import { ServiceInstance } from '../storage/instance/service-instance';
import { ServiceAttribute } from '../storage/attribute/service-attribute';

export class ServiceController extends TController<ServiceModel, ServiceInstance, ServiceAttribute> {
    find(req: express.Request, res: express.Response) {
        let searchText = this.getRequestSearchText(req);
        let findOptions: Sequelize.FindOptions = {
            include: [this.rsbStorage.applicationModel]
        };
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