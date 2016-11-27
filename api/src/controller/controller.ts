import * as express from 'express';
import * as Sequelize from 'sequelize';
import { RsbStorage } from '../storage/rsb-storage';
import { Pagination } from '../entity/pagination';
import { QueryResult } from '../entity/query-result';

export abstract class Controller {
    static rsbStorage: RsbStorage;
}

let getModel = function(req: express.Request) {
    var modelName = req.param('model');
    if (Controller.rsbStorage.sequelize.isDefined(modelName)) {
        return Controller.rsbStorage.sequelize.model(modelName);
    }
    else {
        throw 'Model(' + modelName + ') undefined.';
    }
}

export let queryByPagination = function(req: express.Request, res: express.Response) {
    var pagination: Pagination = {
        index: Number.parseInt(req.query.index),
        size: Number.parseInt(req.query.size)
    };
    var model = getModel(req);
    model.findAll({
        'limit': pagination.size,
        'offset': pagination.size * (pagination.index - 1)
    }).then(r => {
        res.send(r);
    });
}

export let add = function(req: express.Request, res: express.Response) {
    var model = getModel(req);
    model.create(req.body).then(r => {
        res.send();
    }).catch(e => {
        throw 'Create error. Error:' + e;
    });
}

export let update = function(req: express.Request, res: express.Response) {
    var pk = req.param('pk');
    var model = getModel(req);
    model.findById(pk).then(r => {
        (<Sequelize.Instance<{}>>r).update(req.body).then(r => {
            res.send();
        }).catch(e => {
            throw 'Update(Pk:' + pk + ') error. Error:' + e;
        });;
    }).catch(e => {
        throw 'Query(Pk:' + pk + ') error. Error:' + e;
    });
}

export let deleteByPk = function(req: express.Request, res: express.Response) {
    var pk = req.param('pk');
    var model = getModel(req);
    model.findById(pk).then(r => {
        (<Sequelize.Instance<{}>>r).destroy().then(r => {
            res.send();
        }).catch(e => {
            throw 'Delete(Pk:' + pk + ') error. Error:' + e;
        });
    }).catch(e => {
        throw 'Query(Pk:' + pk + ') error. Error:' + e;
    });
}