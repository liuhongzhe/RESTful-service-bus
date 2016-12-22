import * as Sequelize from 'sequelize';
import { AuthorizationAttribute } from '../attribute/authorization-attribute';

export interface AuthorizationInstance extends Sequelize.Instance<AuthorizationAttribute>, AuthorizationAttribute {

}