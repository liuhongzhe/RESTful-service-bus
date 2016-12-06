import { Model } from './model';

export interface Service extends Model {
    applicationGuid: string;
    no: string;
    name: string;
    description?: string;
}