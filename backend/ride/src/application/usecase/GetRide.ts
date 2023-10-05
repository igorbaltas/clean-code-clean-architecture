import IRideDAO from "../repository/IRideDAO";

export default class GetRide {

    constructor(readonly rideDAO: IRideDAO) 
    {}

    async execute(rideId: string){
        const ride = await this.rideDAO.getById(rideId);
        return ride;
    }
}