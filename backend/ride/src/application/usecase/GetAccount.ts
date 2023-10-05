import AccountDAO from "../../infra/repository/AccountDAO";
import IAccountDAO from "../repository/IAccountDAO";

export default class GetAccount {

	constructor (readonly accountDAO: IAccountDAO) {
	}

	async execute(accountId: string) {
		return await this.accountDAO.getById(accountId);
	}
}