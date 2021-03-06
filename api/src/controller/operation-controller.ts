import * as express from 'express';
import * as Sequelize from 'sequelize';
import { TController } from './controller';
import { OperationModel } from '../storage/model/operation-model';
import { OperationInstance } from '../storage/instance/operation-instance';
import { OperationAttribute } from '../storage/attribute/operation-attribute';

export class OperationController extends TController<OperationModel, OperationInstance, OperationAttribute> {
    find(req: express.Request, res: express.Response) {
        let searchText = this.getRequestSearchText(req);
        let findOptions: Sequelize.FindOptions = {
            include: [{
                model: this.rsbStorage.serviceModel,
                include: [this.rsbStorage.applicationModel]
            }]
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