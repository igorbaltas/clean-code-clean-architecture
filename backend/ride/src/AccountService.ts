import crypto from "crypto";
import pgp from "pg-promise";
import CpfValidator from "./CpfValidator";

export default class AccountService {

	constructor () {
	}

	async sendEmail (email: string, subject: string, message: string) {
		console.log(email, subject, message);
	}

	

	async signup (input: any) {
		const connection = pgp()("postgres://postgres:MyPassword@2023@localhost:5432/ridedb");
		try {
			const accountId = crypto.randomUUID();
			const verificationCode = crypto.randomUUID();
			const date = new Date();
			const [existingAccount] = await connection.query("select * from ridedb.account where email = $1", [input.email]);
			if (existingAccount) throw new Error("Account already exists"); 
			if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name"); 
			if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email"); 
			if (!CpfValidator.validate(input.cpf)) throw new Error("Invalid cpf");
			if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid plate"); 
			await connection.query("insert into ridedb.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, date, is_verified, verification_code) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [accountId, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver, date, false, verificationCode]);
			await this.sendEmail(input.email, "Verification", `Please verify your code at first login ${verificationCode}`);
			return { accountId }
		} finally {
			await connection.$pool.end();
		}
	}

	async getAccount (accountId: string) {
		const connection = pgp()("postgres://postgres:MyPassword@2023@localhost:5432/ridedb");
		const [account] = await connection.query("select * from ridedb.account where account_id = $1", [accountId]);
		await connection.$pool.end();
		return account;
	}
}