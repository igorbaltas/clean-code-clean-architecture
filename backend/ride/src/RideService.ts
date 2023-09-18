import crypto from "crypto";
import IRideDAO from "./IRideDAO";
import RideDAO from "./RideDAO";
import AccountDAO from "./AccountDAO";
import IAccountDAO from "./IAccountDAO";

export default class RideService {

    constructor(
        readonly rideDAO: IRideDAO = new RideDAO(),
        readonly accountDAO: IAccountDAO = new AccountDAO()) {
    }

    async requestRide(input: any) {
        const account = await this.accountDAO.getById(input.passengerId);
        if (!account.is_passenger) throw new Error("Account is not from passenger")
        const activeRides = await this.rideDAO.getActiveRidesByPassengerId(input.passengerId);
        if (activeRides.length > 0) throw new Error("This passenger already has an active ride")
        const rideId = crypto.randomUUID();
        const ride = {
            rideId,
            passengerId: input.passengerId,
            status: "requested",
            date: new Date(),
            from: {
                lat: input.from.lat,
                long: input.from.long
            },
            to: {
                lat: input.to.lat,
                long: input.to.long,
            }
        }
        await this.rideDAO.save(ride);
        return { rideId }
    }

    async getRide(rideId: string){
        const ride = await this.rideDAO.getById(rideId);
        return ride;
    }

    async acceptRide(input: any){
        const ride = await this.getRide(input.rideId);
        ride.rideId = ride.ride_id;
        ride.driverId = input.driverId;
        ride.status = "accepted";
        await this.rideDAO.update(ride);
    }
}