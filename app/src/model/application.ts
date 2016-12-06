import { Model } from './model';

export interface Application extends Model {
    no: string;
    name: string;
    description?: string;
}