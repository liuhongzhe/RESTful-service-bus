import { Router } from './router';
import { OperationController } from '../controller/operation-controller';

export class OperationRouter extends Router {
    config() {
        var operationController = new OperationController('operation');
        this.api.get('/operation/:id', operationController.findById.bind(operationController));
        this.api.post('/operation', operationController.create.bind(operationController));
        this.api.put('/operation/:id', operationController.update.bind(operationController));
        this.api.delete('/operation/:id', operationController.destroyById.bind(operationController));
        this.api.get('/operation', operationController.find.bind(operationController));
    }
}