import * as express from 'express';
import { ApplicationRouter } from './application-router';
import { ServiceRouter } from './service-router';
import { OperationRouter } from './operation-router';
import { UserRouter } from './user-router';

export abstract class Router {
    protected static api: express.Application;
    abstract config();
    static init(api: express.Application) {
        this.api = api;
        new ApplicationRouter().config();
    }
}