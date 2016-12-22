import { Router } from './router';
import { AdminController } from '../controller/admin-controller';

export class AdminRouter extends Router {
    config() {
        var adminController = new AdminController('admin');
        this.api.get('/admin/:id', adminController.findById.bind(adminController));
        this.api.post('/admin', adminController.create.bind(adminController));
        this.api.put('/admin/:id', adminController.update.bind(adminController));
        this.api.delete('/admin/:id', adminController.destroyById.bind(adminController));
        this.api.get('/admin', adminController.find.bind(adminController));
        this.api.post('/admin/login', adminController.login.bind(adminController));
    }
}