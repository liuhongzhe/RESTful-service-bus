import { Attribute } from './attribute';
import { UserAttribute } from './user-attribute';
import { AuthorizationType } from '../../entity/authorization-type';
import { ApplicationAttribute } from './application-attribute';
import { ServiceAttribute } from './service-attribute';
import { OperationAttribute } from './operation-attribute';

export interface AuthorizationAttribute extends Attribute {
    userId: string;
    user: UserAttribute;
    authorizationType: AuthorizationType;
    targetId: string;
    authorizationApplication: ApplicationAttribute;
    authorizationService: ServiceAttribute;
    authorizationOperation: OperationAttribute;
}