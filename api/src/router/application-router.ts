import { Router } from './router';
import { ApplicationController } from '../controller/application-controller';

export class ApplicationRouter extends Router {
    config() {
        var applicationController = new ApplicationController('application');
        this.api.get('/application/:id', applicationController.findById.bind(applicationController));
        this.api.post('/application', applicationController.create.bind(applicationController));
        this.api.put('/application/:id', applicationController.update.bind(applicationController));
        this.api.delete('/application/:id', applicationController.destroyById.bind(applicationController));
        this.api.get('/application', applicationController.find.bind(applicationController));
    }
}