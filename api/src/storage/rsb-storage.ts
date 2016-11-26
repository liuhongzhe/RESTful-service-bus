import * as Sequelize from 'sequelize';
import * as Promise from 'bluebird';
import { ApiConfig } from '../api.config';
import { ApplicationModel } from './model/application-model';
import { ApplicationInstance } from './instance/application-instance';
import { ApplicationAttribute } from './attribute/application-attribute';
import { ServiceModel } from './model/service-model';
import { ServiceInstance } from './instance/service-instance';
import { ServiceAttribute } from './attribute/service-attribute';
import { OperationModel } from './model/operation-model';
import { OperationInstance } from './instance/operation-instance';
import { OperationAttribute } from './attribute/operation-attribute';
import { UserModel } from './model/user-model';
import { UserInstance } from './instance/user-instance';
import { UserAttribute } from './attribute/user-attribute';

export class RsbStorage {
    sequelize: Sequelize.Sequelize;
    applicationModel: ApplicationModel;
    serviceModel: ServiceModel;
    operationModel: OperationModel;
    userModel: UserModel;

    constructor() {
        this.sequelize = new Sequelize(ApiConfig.dbName, ApiConfig.dbUsername, ApiConfig.dbPassword, {
            dialect: ApiConfig.dbDialect,
            host: ApiConfig.dbHost,
            port: ApiConfig.dbPort
        });
        this.applicationModel = this.sequelize.define<ApplicationInstance, ApplicationAttribute>('application', {
            guid: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            no: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(500)
            }
        });
        this.serviceModel = this.sequelize.define<ServiceInstance, ServiceAttribute>('service', {
            guid: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            applicationGuid: {
                type: Sequelize.UUID,
                allowNull: false
            },
            no: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(500)
            }
        });
        this.operationModel = this.sequelize.define<OperationInstance, OperationAttribute>('operation', {
            guid: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            serviceGuid: {
                type: Sequelize.UUID,
                allowNull: false
            },
            no: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(500)
            }
        });
        this.userModel = this.sequelize.define<UserInstance, UserAttribute>('user', {
            guid: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        });
    }

    init(force?: boolean): Promise<any> {
        force = force || false;
        return this.sequelize.sync({ force: force, logging: true });
    }
}