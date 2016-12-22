import { Attribute } from './attribute';
import { ServiceAttribute } from './service-attribute';

export interface OperationAttribute extends Attribute {
    serviceId: string;
    service: ServiceAttribute;
    no: string;
    name: string;
    description?: string;
}