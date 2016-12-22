import { Model } from './model';
import { Application } from './application';

export interface Service extends Model {
    applicationId: string;
    application: Application;
    no: string;
    name: string;
    description?: string;
}