import * as express from 'express';
import * as Sequelize from 'sequelize';
import { RsbStorage } from '../storage/rsb-storage';
import { Pagination } from '../entity/pagination';

export abstract class Controller {
    static rsbStorage: RsbStorage;

    protected queryByPagination(req: express.Request, res: express.Response, model: Sequelize.Model<{}, {}>, findOptions: Sequelize.FindOptions = null) {
        if (!findOptions) {
            findOptions = {};
        }
        var pagination: Pagination = {};
        var sizeString = req.param('size');
        if (sizeString && sizeString !== '') {
            pagination.size = Number.parseInt(sizeString);
            findOptions.limit = pagination.size;
            var indexString = req.param('index');
            if (indexString && indexString !== '') {
                pagination.index = Number.parseInt(indexString);
                findOptions.offset = pagination.size * (pagination.index - 1);
            }
        }
        model.findAndCountAll(findOptions).then(r => {
            console.log(r);
            res.send(r);
        }).catch(e => {
            throw 'QueryByPagination error. Error:' + e;
        });
    }
}

let getModel = function (req: express.Request) {
    var modelName = req.param('model');
    if (Controller.rsbStorage.sequelize.isDefined(modelName)) {
        return Controller.rsbStorage.sequelize.model(modelName);
    }
    else {
        throw 'Model(' + modelName + ') undefined.';
    }
}

export let queryByPk = function (req: express.Request, res: express.Response) {
    var pk = req.param('pk');
    var model = getModel(req);
    model.findById(pk).then(r => {
        console.log(r);
        res.send(r);
    }).catch(e => {
        throw 'QueryByPk error. Error:' + e;
    });
}

export let add = function (req: express.Request, res: express.Response) {
    var model = getModel(req);
    model.create(req.body).then(r => {
        res.send();
    }).catch(e => {
        throw 'Create error. Error:' + e;
    });
}

export let update = function (req: express.Request, res: express.Response) {
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

export let deleteByPk = function (req: express.Request, res: express.Response) {
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