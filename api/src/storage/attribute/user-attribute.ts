import { Attribute } from './attribute';

export interface UserAttribute extends Attribute {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}