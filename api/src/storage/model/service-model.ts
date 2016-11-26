import * as Sequelize from 'sequelize';
import { ServiceInstance } from '../instance/service-instance';
import { ServiceAttribute } from '../attribute/service-attribute';

export interface ServiceModel extends Sequelize.Model<ServiceInstance, ServiceAttribute> {

}