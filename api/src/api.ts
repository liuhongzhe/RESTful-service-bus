import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ApiConfig } from './api.config';
import * as routerIndex from './router/router.index';
import { RsbStorage } from './storage/rsb-storage';
import { Controller } from './controller/controller';
import * as uuid from 'node-uuid';

let api = express();
console.info('Info: Express init ok.');
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
console.info('Info: BodyParser init ok.');
routerIndex.init(api);
console.info('Info: Router init ok.');
let rsbStorage = new RsbStorage();
rsbStorage.init(true).then(r => {
    console.info('Info: Db init ok.');
    Controller.rsbStorage = rsbStorage;
    rsbStorage.userModel.create({
        guid: uuid.v1(),
        username: 'admin',
        password: '123',
        name: '管理员'
    }).then(r => {
        console.info('Info: Admin user init ok.');
        api.listen(ApiConfig.port);
        console.info('Info: Linten on port ' + ApiConfig.port + '.');
    });
});