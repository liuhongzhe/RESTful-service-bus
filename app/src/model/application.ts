import { Entity } from './entity';

export interface Application extends Entity {
    no: string;
    name: string;
    description?: string;
}