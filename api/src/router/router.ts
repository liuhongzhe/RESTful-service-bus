import * as express from 'express';

export abstract class Router {
    constructor(protected api: express.Application) { }

    abstract config();
}