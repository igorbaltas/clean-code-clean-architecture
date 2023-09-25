import  crypto from 'crypto';
import AccountDAO from "../src/AccountDAO";
import Account from '../src/Account';

test("Deve criar um registro na tabela account e consultar por email", async function () {
    const accountDAO = new AccountDAO();
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
    const accountDAO = new AccountDAO();
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