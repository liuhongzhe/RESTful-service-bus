import { Model } from './model';
import { Service } from './service';

export interface Operation extends Model {
    serviceId: string;
    service: Service;
    no: string;
    name: string;
    description?: string;
}