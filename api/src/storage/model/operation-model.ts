import * as Sequelize from 'sequelize';
import { OperationInstance } from '../instance/operation-instance';
import { OperationAttribute } from '../attribute/operation-attribute';

export interface OperationModel extends Sequelize.Model<OperationInstance, OperationAttribute> {

}