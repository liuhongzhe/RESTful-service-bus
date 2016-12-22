import { Router } from './router';
import { UserController } from '../controller/user-controller';

export class UserRouter extends Router {
    config() {
        var userController = new UserController('user');
        this.api.get('/user/:id', userController.findById.bind(userController));
        this.api.post('/user', userController.create.bind(userController));
        this.api.put('/user/:id', userController.update.bind(userController));
        this.api.delete('/user/:id', userController.destroyById.bind(userController));
        this.api.get('/user', userController.find.bind(userController));
        this.api.post('/user/login', userController.login.bind(userController));
    }
}