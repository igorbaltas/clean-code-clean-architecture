import IConnection from "./IConnection";
import pgp from "pg-promise";

export default class PgPromiseAdapter implements IConnection {
    
    connection: any;

    constructor() {
        this.connection = pgp()("postgres://postgres:1234567@localhost:5432/app");
    }

    query(statement: string, data: any): Promise<any> {
        return this.connection.query(statement, data);
    }

    async close(): Promise<void> {
        await this.connection.$pool.end();
    }
}