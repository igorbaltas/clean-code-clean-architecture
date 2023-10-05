import AccountDAO from "../../src/infra/repository/AccountDAO";
import Account from '../../src/domain/Account';
import IConnection from "../../src/infra/database/IConnection";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import IAccountDAO from "../../src/application/repository/IAccountDAO";

let accountDAO: IAccountDAO;
let connection: IConnection;

beforeEach(function() {
    connection = new PgPromiseAdapter();
    accountDAO = new AccountDAO(connection);
});

test("Deve criar um registro na tabela account e consultar por email", async function () {
    const input = Account.create("John Doe", `john.doe${Math.random()}@gmail.com`, "04765351076", true, false, "")
    await accountDAO.save(input);
    const savedAccount = await accountDAO.getByEmail(input.email);
    expect(savedAccount?.accountId).toBeDefined();
    expect(savedAccount?.name).toBe(input.name);
    expect(savedAccount?.email).toBe(input.email);
    expect(savedAccount?.cpf).toBe(input.cpf);
    expect(savedAccount?.isPassenger).toBeTruthy();
    expect(savedAccount?.date).toBeDefined();
    expect(savedAccount?.verificationCode).toBe(input.verificationCode);
})

test("Deve criar um registro na tabela account e consultar por account_id", async function () {
    const input = Account.create("John Doe", `john.doe${Math.random()}@gmail.com`, "04765351076", true, false, "")
    await accountDAO.save(input);
    const savedAccount = await accountDAO.getById(input.accountId);
    expect(savedAccount?.accountId).toBeDefined();
    expect(savedAccount?.name).toBe(input.name);
    expect(savedAccount?.email).toBe(input.email);
    expect(savedAccount?.cpf).toBe(input.cpf);
    expect(savedAccount?.isPassenger).toBeTruthy();
    expect(savedAccount?.date).toBeDefined();
    expect(savedAccount?.verificationCode).toBe(input.verificationCode);
})

afterEach(async function () {
    await connection.close();
})