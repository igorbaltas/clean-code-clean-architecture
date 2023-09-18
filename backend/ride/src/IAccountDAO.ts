export default interface IAccountDAO {
    save(account: any): Promise<void>;
    getByEmail(email: string): Promise<any>;
    getById(accountId: string): Promise<any>;
}