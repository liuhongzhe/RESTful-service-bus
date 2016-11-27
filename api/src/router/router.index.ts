import * as express from 'express';
import { ApplicationRouter } from './application-router';
import { ServiceRouter } from './service-router';
import { OperationRouter } from './operation-router';
import { UserRouter } from './user-router';

export let init = function (api: express.Application) {
    api.use(function (req, res, next) {
        console.info('Info: Api(' + req.url + ') has be called. Method:' + req.method + '. Body:' + JSON.stringify(req.body));
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    });
    new ApplicationRouter(api).config();
    new ServiceRouter(api).config();
    new OperationRouter(api).config();
    new UserRouter(api).config();
}