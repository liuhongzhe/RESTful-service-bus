import * as express from 'express';
import { Controller } from './controller';

export let login = function (req: express.Request, res: express.Response) {
    var username: string = req.body.username;
    var password: string = req.body.password;
    Controller.rsbStorage.userModel.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(r => {
        res.send(r);
    });
}