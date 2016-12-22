import { Router } from './router';
import { ServiceController } from '../controller/service-controller';

export class ServiceRouter extends Router {
    config() {
        var serviceController = new ServiceController('service');
        this.api.get('/service/:id', serviceController.findById.bind(serviceController));
        this.api.post('/service', serviceController.create.bind(serviceController));
        this.api.put('/service/:id', serviceController.update.bind(serviceController));
        this.api.delete('/service/:id', serviceController.destroyById.bind(serviceController));
        this.api.get('/service', serviceController.find.bind(serviceController));
    }
}