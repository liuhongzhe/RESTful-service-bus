import * as express from 'express';
import * as Sequelize from 'sequelize';
import { TController } from './controller';
import { AuthorizationModel } from '../storage/model/authorization-model';
import { AuthorizationInstance } from '../storage/instance/authorization-instance';
import { AuthorizationAttribute } from '../storage/attribute/authorization-attribute';

export class AuthorizationController extends TController<AuthorizationModel, AuthorizationInstance, AuthorizationAttribute> {
    find(req: express.Request, res: express.Response) {
        let searchText = this.getRequestSearchText(req);
        let findOptions: Sequelize.FindOptions = {
            include: [
                this.rsbStorage.userModel,
                this.rsbStorage.applicationModel,
                this.rsbStorage.serviceModel,
                this.rsbStorage.operationModel
            ]
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