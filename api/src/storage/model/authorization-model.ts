import * as Sequelize from 'sequelize';
import { AuthorizationInstance } from '../instance/authorization-instance';
import { AuthorizationAttribute } from '../attribute/authorization-attribute';

export interface AuthorizationModel extends Sequelize.Model<AuthorizationInstance, AuthorizationAttribute> {

}