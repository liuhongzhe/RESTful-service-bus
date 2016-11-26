import * as Sequelize from 'sequelize';
import { ServiceAttribute } from '../attribute/service-attribute';

export interface ServiceInstance extends Sequelize.Instance<ServiceAttribute>, ServiceAttribute {

}