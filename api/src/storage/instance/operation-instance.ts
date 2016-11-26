import * as Sequelize from 'sequelize';
import { OperationAttribute } from '../attribute/operation-attribute';

export interface OperationInstance extends Sequelize.Instance<OperationAttribute>, OperationAttribute {

}