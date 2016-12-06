import { Router } from './router';
import { ApplicationController } from '../controller/application-controller';

export class ApplicationRouter extends Router {
    config() {
        var applicationController = new ApplicationController();
        this.api.get('/application', applicationController.query);
    }
}