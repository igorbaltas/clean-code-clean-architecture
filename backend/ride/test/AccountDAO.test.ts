import  crypto from 'crypto';
import AccountDAO from "../src/AccountDAO";

test("Deve criar um registro na tabela account e consultar por email", async function () {
    const accountDAO = new AccountDAO();
    const input = {
        accountId: crypto.randomUUID(),
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true,
        date: new Date(),
        verificationCode: crypto.randomUUID()
    }
    await accountDAO.save(input);
    const savedAccount = await accountDAO.getByEmail(input.email);
    expect(savedAccount.account_id).toBeDefined();
    expect(savedAccount.name).toBe(input.name);
    expect(savedAccount.email).toBe(input.email);
    expect(savedAccount.cpf).toBe(input.cpf);
    expect(savedAccount.is_passenger).toBeTruthy();
    expect(savedAccount.date).toBeDefined();
    expect(savedAccount.verification_code).toBe(input.verificationCode);
})

test("Deve criar um registro na tabela account e consultar por account_id", async function () {
    const accountDAO = new AccountDAO();
    const input = {
        accountId: crypto.randomUUID(),
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true,
        date: new Date(),
        verificationCode: crypto.randomUUID()
    }
    await accountDAO.save(input);
    const savedAccount = await accountDAO.getById(input.accountId);
    expect(savedAccount.account_id).toBeDefined();
    expect(savedAccount.name).toBe(input.name);
    expect(savedAccount.email).toBe(input.email);
    expect(savedAccount.cpf).toBe(input.cpf);
    expect(savedAccount.is_passenger).toBeTruthy();
    expect(savedAccount.date).toBeDefined();
    expect(savedAccount.verification_code).toBe(input.verificationCode);
})