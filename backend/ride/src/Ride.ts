import crypto from "crypto";

export default class Ride {
    driverId?: string;

    private constructor(
        readonly rideId: string,
        readonly passengerId: string,
        readonly fromLat: number,
        readonly fromLong: number,
        readonly toLat: number,
        readonly toLong: number,
        private status: string,
        readonly date: Date){
    }

    static create(passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
        const rideId = crypto.randomUUID();
        const status = "requested"
        const date = new Date();
        return new Ride(rideId, passengerId, fromLat, fromLong, toLat, toLong, status, date);
    }

    static restore(rideId: string, passengerId: string, driverId: string, status: string, fromLat: number, fromLong: number, toLat: number, toLong: number, date: Date) {
        const ride = new Ride(rideId, passengerId, fromLat, fromLong, toLat, toLong, status, date);
        ride.driverId = driverId;
        return ride;
    }

    accept(driverId: string) {
        if (this.status !== "requested") throw new Error("The ride is not requested")
        this.driverId = driverId;
        this.status = "accepted";
    }

    getStatus() {
        return this.status;
    }
}