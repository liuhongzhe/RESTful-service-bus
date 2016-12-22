import { Attribute } from './attribute';

export interface AdminAttribute extends Attribute {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}