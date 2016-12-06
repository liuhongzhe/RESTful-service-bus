import { ServiceAttribute } from './service-attribute';

export interface OperationAttribute {
    guid: string;
    serviceGuid: string;
    service: ServiceAttribute;
    no: string;
    name: string;
    description?: string;
}