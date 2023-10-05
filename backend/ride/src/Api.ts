import express from "express";
import Signup from "./Signup";
import GetAccount from "./GetAccount";
import PgPromiseAdapter from "./PgPromiseAdapter";
import AccountDAO from "./AccountDAO";
const app = express();

app.use(express.json());
const connection = new PgPromiseAdapter();
const accountDAO = new AccountDAO(connection);

app.post("/signup", async function (req, res) {
    const input = req.body;
    const signup = new Signup(accountDAO);
    const output = await signup.execute(input);
    res.json(output);
});

app.get("/accounts/:accountId", async function (req, res) {
    const getAccount = new GetAccount(accountDAO);
    const output = await getAccount.execute(req.params.accountId);
    res.json(output);
});
app.listen(3000);