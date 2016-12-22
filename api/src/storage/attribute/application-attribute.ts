import { Attribute } from './attribute';

export interface ApplicationAttribute extends Attribute {
    no: string;
    name: string;
    description?: string;
}