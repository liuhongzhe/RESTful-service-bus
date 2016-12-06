import { Router } from './router';
import { UserController } from '../controller/user-controller';

export class UserRouter extends Router {
    config() {
        var userController = new UserController();
        this.api.post('/user/login', userController.login);
        this.api.get('/user', userController.query);
    }
}