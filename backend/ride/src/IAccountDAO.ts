import Account from "./Account";

export default interface IAccountDAO {
    save(account: Account): Promise<void>;
    getByEmail(email: string): Promise<Account | undefined>;
    getById(accountId: string): Promise<Account | undefined>;
}