import sinon from "sinon";
import AccountService from "../src/AccountService";
import AccountDAO from "../src/AccountDAO";
import MailerGateway from "../src/MailerGateway";
import AccountDAOMemory from "../src/AccountDAOMemory";
import Account from "../src/Account";

test("Deve criar um passageiro", async function () {
    const input: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const accountService = new AccountService();
    const output = await accountService.signup(input);
    const account = await accountService.getAccount(output.accountId);
    expect(account?.accountId).toBeDefined();
    expect(account?.name).toBe(input.name);
    expect(account?.email).toBe(input.email);
    expect(account?.cpf).toBe(input.cpf);
})

test("Não deve criar um passageiro com cpf inválido", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351000",
        isPassenger: true
    }
    const accountService = new AccountService();
    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid cpf"));
})

test("Não deve criar um passageiro com email inválido", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@`,
        cpf: "04765351076",
        isPassenger: true
    }
    const accountService = new AccountService();
    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid email"));
})

test("Não deve criar um passageiro com nome inválido", async function () {
    const input = {
        name: "",
        email: `john.doe${Math.random()}@`,
        cpf: "04765351076",
        isPassenger: true
    }
    const accountService = new AccountService();
    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid name"));
})


test("Não deve criar um passageiro com conta existente", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const accountService = new AccountService();
    await accountService.signup(input);
    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Account already exists"));
})


test("Deve criar um motorista", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isDriver: true,
        carPlate: "AAA9999"
    }
    const accountService = new AccountService();
    const output = await accountService.signup(input);
    expect(output.accountId).toBeDefined();
})

test("Não deve criar um motorista com placa do carro inválida", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isDriver: true,
        carPlate: "AAA999"
    }
    const accountService = new AccountService();
    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid plate"));
})

test("Deve criar um passageiro com stub", async function () {
    const input: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const stubSave = sinon.stub(AccountDAO.prototype, "save").resolves();
    const stubGetByEmail = sinon.stub(AccountDAO.prototype, "getByEmail").resolves();
    const accountService = new AccountService();
    const output = await accountService.signup(input);
    input.account_id = output.accountId;
    const stubGetById = sinon.stub(AccountDAO.prototype, "getById").resolves(Account.create(input.name, input.email, input.cpf, input.isPassenger, false, ""));
    const account = await accountService.getAccount(output.accountId);
    expect(account?.accountId).toBeDefined();
    expect(account?.name).toBe(input.name);
    expect(account?.email).toBe(input.email);
    expect(account?.cpf).toBe(input.cpf);
    stubSave.restore();
    stubGetByEmail.restore();
    stubGetById.restore();
})

test("Deve criar um passageiro com spy", async function () {
    const spySend = sinon.spy(MailerGateway.prototype, "send");
    const input: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const spySave = sinon.stub(AccountDAO.prototype, "save").resolves();
    const spyGetByEmail = sinon.stub(AccountDAO.prototype, "getByEmail").resolves();
    const accountService = new AccountService();
    const output = await accountService.signup(input);
    input.account_id = output.accountId;
    const spyGetById = sinon.stub(AccountDAO.prototype, "getById").resolves(input);
    const account = await accountService.getAccount(output.accountId);
    expect(spySend.calledOnce).toBeTruthy();
    expect(spySend.calledWith(input.email)).toBeTruthy();
    spySend.restore();
    spySave.restore();
    spyGetByEmail.restore();
    spyGetById.restore();
})

test("Deve criar um passageiro com mock", async function () {
    const input: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const mock = sinon.mock(MailerGateway.prototype);
    mock.expects("send").withArgs(input.email, "Verification").calledOnce;
    const mockAccountDAO = sinon.mock(AccountDAO.prototype);
    mockAccountDAO.expects("save").resolves();
    mockAccountDAO.expects("getByEmail").resolves();
    const accountService = new AccountService();
    const output = await accountService.signup(input);
    input.account_id = output.accountId;
    mockAccountDAO.expects("getByEmail").resolves(input);
    const account = await accountService.getAccount(output.accountId);
    mock.verify();
    mock.restore();
})

test("Deve criar um passageiro com fake", async function () {
    const accountDAO = new AccountDAOMemory();
    const input: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const accountService = new AccountService(accountDAO);
    const output = await accountService.signup(input);
    const account = await accountService.getAccount(output.accountId);
    expect(account?.accountId).toBeDefined();
    expect(account?.name).toBe(input.name);
    expect(account?.email).toBe(input.email);
    expect(account?.cpf).toBe(input.cpf);
})