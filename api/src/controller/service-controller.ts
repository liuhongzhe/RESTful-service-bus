import * as express from 'express';
import { Controller } from './controller';

export class ServiceController extends Controller {
    query(req: express.Request, res: express.Response) {
        var text = req.param('text');
        var where = {};
        if (text && text !== '') {
            where = {
                '$or': [
                    {
                        name: {
                            '$like': '%' + text + '%'
                        }
                    },
                    {
                        no: {
                            '$like': '%' + text + '%'
                        }
                    }
                ]
            };
        }
        return super.queryByPagination(req, res, Controller.rsbStorage.serviceModel, {
            where: where,
            include: [Controller.rsbStorage.applicationModel]
        });
    }
}