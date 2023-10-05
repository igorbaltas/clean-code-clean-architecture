import AccountDAO from "./AccountDAO";
import IAccountDAO from "./IAccountDAO";

export default class GetAccount {

	constructor (readonly accountDAO: IAccountDAO) {
	}

	async execute(accountId: string) {
		return await this.accountDAO.getById(accountId);
	}
}