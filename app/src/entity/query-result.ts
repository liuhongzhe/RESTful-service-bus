export interface QueryResult<T> {
    total: number;
    rows: T[];
}