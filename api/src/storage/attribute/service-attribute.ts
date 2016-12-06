import { ApplicationAttribute } from './application-attribute';

export interface ServiceAttribute {
    guid: string;
    applicationGuid: string;
    application: ApplicationAttribute;
    no: string;
    name: string;
    description?: string;
}