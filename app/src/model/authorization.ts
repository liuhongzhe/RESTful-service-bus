import { Model } from './model';
import { User } from './user';
import { AuthorizationType } from '../entity/authorization-type';
import { Application } from './application';
import { Service } from './service';
import { Operation } from './operation';

export interface Authorization extends Model {
    userId: string;
    user: User;
    authorizationType: AuthorizationType;
    targetId: string;
    authorizationApplication: Application;
    authorizationService: Service;
    authorizationOperation: Operation;
}