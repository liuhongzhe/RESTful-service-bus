import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ApiConfig } from './api.config';
import { ApiCache } from './api.cache';
import * as routerIndex from './router/router.index';
import { RsbStorage } from './storage/rsb-storage';
import { Controller } from './controller/controller';
import * as uuid from 'node-uuid';

var init = false;
let api = express();
console.info('Info: Express init ok.');
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
console.info('Info: BodyParser init ok.');
let rsbStorage = new RsbStorage();
rsbStorage.init(init).then(r => {
    console.info('Info: Db init ok.');
    ApiCache.rsbStorage = rsbStorage;
    routerIndex.init(api);
    console.info('Info: Router init ok.');
    if (init) {
        rsbStorage.adminModel.create({
            username: 'admin',
            password: '123',
            firstName: 'Admin',
            lastName: 'Liu',
            phone: '18240090928'
        }).then(r => {
            console.info('Info: Admin init ok.');
            api.listen(ApiConfig.port);
            console.info('Info: Linten on port ' + ApiConfig.port + '.');
        });
    }
    else {
        api.listen(ApiConfig.port);
        console.info('Info: Linten on port ' + ApiConfig.port + '.');
    }
});