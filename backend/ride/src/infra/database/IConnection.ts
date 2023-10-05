export default interface IConnection {
    query(statement: string, data: any): Promise<any>;
    close(): Promise<void>;
}