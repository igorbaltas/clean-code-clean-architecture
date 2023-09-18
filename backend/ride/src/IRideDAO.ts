export default interface RideDAO {
    save(ride: any): Promise<void>;
    update(ride: any): Promise<void>;
    getById(rideId: any): Promise<any>;
    getActiveRidesByPassengerId(passengerId: string): Promise<any>;
}