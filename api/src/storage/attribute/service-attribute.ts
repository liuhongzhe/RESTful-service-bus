import { Attribute } from './attribute';
import { ApplicationAttribute } from './application-attribute';

export interface ServiceAttribute extends Attribute {
    applicationId: string;
    application: ApplicationAttribute;
    no: string;
    name: string;
    description?: string;
}