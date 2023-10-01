import AccountDAO from "./AccountDAO";
import IAccountDAO from "./IAccountDAO";

export default class GetAccount {

	constructor (readonly accountDAO: IAccountDAO = new AccountDAO()) {
	}

	async execute(accountId: string) {
		return await this.accountDAO.getById(accountId);
	}
}