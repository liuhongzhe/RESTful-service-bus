import * as Sequelize from 'sequelize';
import * as Promise from 'bluebird';
import { ApiConfig } from '../api.config';
import { AdminModel } from './model/admin-model';
import { AdminInstance } from './instance/admin-instance';
import { AdminAttribute } from './attribute/admin-attribute';
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
import { AuthorizationModel } from './model/authorization-model';
import { AuthorizationInstance } from './instance/authorization-instance';
import { AuthorizationAttribute } from './attribute/authorization-attribute';

export class RsbStorage {
    sequelize: Sequelize.Sequelize;
    adminModel: AdminModel;
    applicationModel: ApplicationModel;
    serviceModel: ServiceModel;
    operationModel: OperationModel;
    userModel: UserModel;
    authorizationModel: AuthorizationModel;

    constructor() {
        this.sequelize = new Sequelize(ApiConfig.dbName, ApiConfig.dbUsername, ApiConfig.dbPassword, {
            dialect: ApiConfig.dbDialect,
            host: ApiConfig.dbHost,
            port: ApiConfig.dbPort
        });
        this.adminModel = this.sequelize.define<AdminInstance, AdminAttribute>('admin', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        });
        this.applicationModel = this.sequelize.define<ApplicationInstance, ApplicationAttribute>('application', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
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
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            applicationId: {
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
        this.serviceModel.belongsTo(this.applicationModel);
        this.operationModel = this.sequelize.define<OperationInstance, OperationAttribute>('operation', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            serviceId: {
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
        this.operationModel.belongsTo(this.serviceModel);
        this.userModel = this.sequelize.define<UserInstance, UserAttribute>('user', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        });
        this.authorizationModel = this.sequelize.define<AuthorizationInstance, AuthorizationAttribute>('authorization', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            authorizationType: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            targetId: {
                type: Sequelize.UUID,
                allowNull: false
            }
        });
        this.authorizationModel.belongsTo(this.userModel);
        this.authorizationModel.belongsTo(this.applicationModel);
        this.authorizationModel.belongsTo(this.serviceModel);
        this.authorizationModel.belongsTo(this.operationModel);
    }

    init(force?: boolean): Promise<any> {
        force = force || false;
        return this.sequelize.sync({ force: force, logging: true });
    }
}