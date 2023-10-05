import IRideDAO from "../repository/IRideDAO";

export default class StartRide {

    constructor(readonly rideDAO: IRideDAO) {
    }

    async execute(input: Input){
        const ride = await this.rideDAO.getById(input.rideId);
        ride.start();
        await this.rideDAO.update(ride);
    }
}

type Input = {
    rideId: string
}