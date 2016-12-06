import { Router } from './router';
import { ServiceController } from '../controller/service-controller';

export class ServiceRouter extends Router {
    config() {
        var serviceController = new ServiceController();
        this.api.get('/service', serviceController.query);
    }
}