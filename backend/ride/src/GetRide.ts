import IRideDAO from "./IRideDAO";
import RideDAO from "./RideDAO";
import AccountDAO from "./AccountDAO";
import IAccountDAO from "./IAccountDAO";

export default class GetRide {

    constructor(readonly rideDAO: IRideDAO = new RideDAO()) 
    {}

    async execute(rideId: string){
        const ride = await this.rideDAO.getById(rideId);
        return ride;
    }
}