import { Router } from './router';
import * as userController from '../controller/user-controller';

export class UserRouter extends Router {
    config() {
        this.api.post('/user/login', userController.login);
    }
}