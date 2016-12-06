import { Router } from './router';
import { OperationController } from '../controller/operation-controller';

export class OperationRouter extends Router {
    config() {
        var operationController = new OperationController();
        this.api.get('/operation', operationController.query);
    }
}