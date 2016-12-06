import * as express from 'express';
import { Controller } from './controller';

export class UserController extends Controller {
    login(req: express.Request, res: express.Response) {
        var username: string = req.body.username;
        var password: string = req.body.password;
        Controller.rsbStorage.userModel.findOne({
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

    query(req: express.Request, res: express.Response) {
        var text = req.param('text');
        var where = {};
        if (text && text !== '') {
            where = {
                '$or': [
                    {
                        username: {
                            '$like': '%' + text + '%'
                        }
                    },
                    {
                        name: {
                            '$like': '%' + text + '%'
                        }
                    }
                ]
            };
        }
        return super.queryByPagination(req, res, Controller.rsbStorage.userModel, {
            where: where
        });
    }
}