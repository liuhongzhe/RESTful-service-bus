import * as express from 'express';
import { ApiConfig } from './api.config';
import { Router } from './router/router';
import { RsbStorage } from './storage/rsb-storage';
import { Controller } from './controller/controller';

let api = express();
console.info('Info: Express init ok.');
Router.init(api);
console.info('Info: Router init ok.');
let rsbStorage = new RsbStorage();
rsbStorage.init(true).then(r => {
    console.info('Info: Db init ok.');
    Controller.rsbStorage = rsbStorage;
    api.listen(ApiConfig.port);
    console.info('Info: Linten on port ' + ApiConfig.port + '.');
});