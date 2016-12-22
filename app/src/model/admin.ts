import { Model } from './model';

export interface Admin extends Model {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}