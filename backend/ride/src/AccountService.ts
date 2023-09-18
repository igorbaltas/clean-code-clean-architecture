import crypto from "crypto";
import pgp from "pg-promise";
import CpfValidator from "./CpfValidator";
import AccountDAO from "./AccountDAO";
import MailerGateway from "./MailerGateway";
import IAccountDAO from "./IAccountDAO";

export default class AccountService {

	cpfValidator: CpfValidator;
	mailerGateway: MailerGateway;

	constructor (readonly accountDAO: IAccountDAO = new AccountDAO()) {
		this.cpfValidator = new CpfValidator();
		this.mailerGateway = new MailerGateway();
	}

	async signup (input: any) {
			input.accountId = crypto.randomUUID();
			input.verificationCode = crypto.randomUUID();
			input.date = new Date();
			const existingAccount = await this.accountDAO.getByEmail(input.email)
			if (existingAccount) throw new Error("Account already exists"); 
			if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name"); 
			if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email"); 
			if (!this.cpfValidator.validate(input.cpf)) throw new Error("Invalid cpf");
			if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid plate"); 
			await this.accountDAO.save(input)
			await this.mailerGateway.send(input.email, "Verification", `Please verify your code at first login ${input.verificationCode}`);
			return { accountId: input.accountId }
	}

	async getAccount (accountId: string) {
		return await this.accountDAO.getById(accountId);
	}
}