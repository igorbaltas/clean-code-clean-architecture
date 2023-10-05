import GetAccount from "./GetAccount";
import IHttpServer from "./IHttpServer";
import Signup from "./Signup";

export default class MainController {
    
    constructor(readonly httpServer: IHttpServer, signup: Signup, getAccount: GetAccount){
        httpServer.on("post", "/signup", async function(params: any, body: any){
            await signup.execute(body);
        })

        httpServer.on("get", "/account/:accountId", async function(params: any, body: any){
            const output = await getAccount.execute(params.accountId);
            return output;
        })
    }
}