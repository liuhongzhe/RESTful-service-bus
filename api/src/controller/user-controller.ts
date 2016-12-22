import * as express from 'express';
import * as Sequelize from 'sequelize';
import { TController } from './controller';
import { UserModel } from '../storage/model/user-model';
import { UserInstance } from '../storage/instance/user-instance';
import { UserAttribute } from '../storage/attribute/user-attribute';

export class UserController extends TController<UserModel, UserInstance, UserAttribute> {
    find(req: express.Request, res: express.Response) {
        let searchText = this.getRequestSearchText(req);
        let findOptions: Sequelize.FindOptions = {};
        findOptions = this.buildPaginationFindOptions(req, findOptions);
        if (searchText && searchText !== '') {
            findOptions.where = {
                '$or': [
                    {
                        username: {
                            '$like': '%' + searchText + '%'
                        }
                    },
                    {
                        firstName: {
                            '$like': '%' + searchText + '%'
                        }
                    },
                    {
                        lastName: {
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

    login(req: express.Request, res: express.Response) {
        let username: string = req.body.username;
        let password: string = req.body.password;
        this.model.findOne({
            where: {
                username: username,
                password: password
            }
        }).then(r => {
            if (r) {
                r.password = null;
            }
            res.send(r);
        });
    }
}