import { Router } from './router';
import { AdminController } from '../controller/admin-controller';

export class AdminRouter extends Router {
    config() {
        var adminController = new AdminController();
        this.api.post('/admin/login', adminController.login);
        this.api.get('/admin', adminController.query);
    }
}