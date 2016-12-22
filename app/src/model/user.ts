import { Model } from './model';

export interface User extends Model {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}