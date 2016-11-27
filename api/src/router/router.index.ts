import * as express from 'express';
import { ApplicationRouter } from './application-router';
import { ServiceRouter } from './service-router';
import { OperationRouter } from './operation-router';
import { UserRouter } from './user-router';

export let init = function (api: express.Application) {
    api.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    new ApplicationRouter(api).config();
    new ServiceRouter(api).config();
    new OperationRouter(api).config();
    new UserRouter(api).config();
}