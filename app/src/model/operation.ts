import { Model } from './model';

export interface Operation extends Model {
    serviceGuid: string;
    no: string;
    name: string;
    description?: string;
}