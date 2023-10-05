import Account from "../../domain/Account";
import IAccountDAO from "../../application/repository/IAccountDAO";

export default class AccountDAOMemory implements IAccountDAO {
    accounts: any = [];

    async save(account: Account): Promise<void> {
        this.accounts.push(account);
    }

    async getByEmail(email: string): Promise<Account | undefined> {
        const account = this.accounts.find((account: any) => account.email === email);
        if (!account) return;
        account.account_id = account.accountId;
        return account;
    }

    async getById(accountId: string):  Promise<Account | undefined> {
        const account = this.accounts.find((account: Account) => account.accountId === accountId);
        account.account_id = account.accountId;
        return account;
    }
}