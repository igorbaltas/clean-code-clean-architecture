import AcceptRide from "../src/AcceptRide";
import GetRide from "../src/GetRide";
import RequestRide from "../src/RequestRide";
import Signup from "../src/Signup";


test("Deve solicitar uma corrida e receber rideId", async function() {
    const inputSignup: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const signup = new Signup();
    const outputSignup = await signup.execute(inputSignup);
    const inputRequestRide = {
        passengerId: outputSignup.accountId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.496887588317275,
            long: -48.522234807851476
        }
    }
    const requestRide = new RequestRide();
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    expect(outputRequestRide.rideId).toBeDefined();
})

test("Deve solicitar e consultar uma corrida", async function() {
    const inputSignup: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const signup = new Signup();
    const outputSignup = await signup.execute(inputSignup);
    const inputRequestRide = {
        passengerId: outputSignup.accountId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.496887588317275,
            long: -48.522234807851476
        }
    }
    const requestRide = new RequestRide();
    const getRide = new GetRide();
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.getStatus()).toBe("requested");
    expect(outputGetRide.passengerId).toBe(outputSignup.accountId);
    expect(outputGetRide.fromLat).toBe(inputRequestRide.from.lat);
    expect(outputGetRide.fromLong).toBe(inputRequestRide.from.long);
    expect(outputGetRide.toLat).toBe(inputRequestRide.to.lat);
    expect(outputGetRide.toLong).toBe(inputRequestRide.to.long);
    expect(outputGetRide.date).toBeDefined();
})

test("Deve solicitar e aceitar uma corrida", async function() {
    const signup = new Signup();
    const inputSignupPassenger: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const outputSignupPassenger = await signup.execute(inputSignupPassenger);
    const inputRequestRide = {
        passengerId: outputSignupPassenger.accountId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.496887588317275,
            long: -48.522234807851476
        }
    }
    const requestRide = new RequestRide();
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputSignupDriver: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        carPlate: "AAA9999",
        isDriver: true
    }
    const outputSignupDriver = await signup.execute(inputSignupDriver);
    const inputAcceptRide = {
        rideId: outputRequestRide.rideId,
        driverId: outputSignupDriver.accountId
    }
    const acceptRide = new AcceptRide();
    await acceptRide.execute(inputAcceptRide);
    const getRide = new GetRide();
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.getStatus()).toBe("accepted");
    expect(outputGetRide.driverId).toBe(outputSignupDriver.accountId);
})

test("Caso uma corrida seja solicitada por uma conta que não seja de passageiro, deve lançar um erro", async function() {
    const inputSignup: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        carPlate: "AAA9999",
        isDriver: true
    }
    const signup = new Signup();
    const outputSignup = await signup.execute(inputSignup);
    const inputRequestRide = {
        passengerId: outputSignup.accountId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.496887588317275,
            long: -48.522234807851476
        }
    }
    const requestRide = new RequestRide();
    await expect(() => requestRide.execute(inputRequestRide)).rejects.toThrow(new Error("Account is not from a passenger"));
})

test("Caso uma corrida seja solicitada por um passageiro e ele ja tenha outra corrida em andamento, deve lançar um erro", async function() {
    const inputSignup: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const signup = new Signup();
    const outputSignup = await signup.execute(inputSignup);
    const inputRequestRide = {
        passengerId: outputSignup.accountId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.496887588317275,
            long: -48.522234807851476
        }
    }
    const requestRide = new RequestRide();
    await requestRide.execute(inputRequestRide);
    await expect(() => requestRide.execute(inputRequestRide)).rejects.toThrow(new Error("This passenger already has an active ride"));
})

test("Não deve aceitar uma corrida se account não for driver", async function() {
    const signup = new Signup();
    const inputSignupPassenger: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const outputSignupPassenger = await signup.execute(inputSignupPassenger);
    const inputRequestRide = {
        passengerId: outputSignupPassenger.accountId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.496887588317275,
            long: -48.522234807851476
        }
    }
    const requestRide = new RequestRide();
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputSignupDriver: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        carPlate: "AAA9999",
        isPassenger: true
    }
    const outputSignupDriver = await signup.execute(inputSignupDriver);
    const inputAcceptRide = {
        rideId: outputRequestRide.rideId,
        driverId: outputSignupDriver.accountId
    }
    const acceptRide = new AcceptRide();
    await expect(() =>  acceptRide.execute(inputAcceptRide)).rejects.toThrow(new Error("Account is not from a driver"));
})

test("Não deve aceitar uma corrida se status não for requested", async function() {
    const signup = new Signup();
    const inputSignupPassenger: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const outputSignupPassenger = await signup.execute(inputSignupPassenger);
    const inputRequestRide = {
        passengerId: outputSignupPassenger.accountId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.496887588317275,
            long: -48.522234807851476
        }
    }
    const requestRide = new RequestRide();
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputSignupDriver: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        carPlate: "AAA9999",
        isDriver: true
    }
    const outputSignupDriver = await signup.execute(inputSignupDriver);
    const inputAcceptRide = {
        rideId: outputRequestRide.rideId,
        driverId: outputSignupDriver.accountId
    }
    const acceptRide = new AcceptRide();
    await acceptRide.execute(inputAcceptRide);
    await expect(() =>  acceptRide.execute(inputAcceptRide)).rejects.toThrow(new Error("The ride is not requested"));
})

test("Não deve aceitar uma corrida se o motorista já tiver outra corrida em andamento", async function() {
    const signup = new Signup();
    const inputSignupPassenger1: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const outputSignupPassenger1 = await signup.execute(inputSignupPassenger1);
    const inputRequestRide1 = {
        passengerId: outputSignupPassenger1.accountId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.496887588317275,
            long: -48.522234807851476
        }
    }
    const inputSignupPassenger2: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        isPassenger: true
    }
    const outputSignupPassenger2 = await signup.execute(inputSignupPassenger2);
    const inputRequestRide2 = {
        passengerId: outputSignupPassenger2.accountId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.496887588317275,
            long: -48.522234807851476
        }
    }
    const requestRide = new RequestRide();
    const outputRequestRide1 = await requestRide.execute(inputRequestRide1);
    const outputRequestRide2 = await requestRide.execute(inputRequestRide2);
    const inputSignupDriver: any = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "04765351076",
        carPlate: "AAA9999",
        isDriver: true
    }
    const outputSignupDriver = await signup.execute(inputSignupDriver);
    const inputAcceptRide1 = {
        rideId: outputRequestRide1.rideId,
        driverId: outputSignupDriver.accountId
    }
    const acceptRide = new AcceptRide();
    await acceptRide.execute(inputAcceptRide1);
    const inputAcceptRide2 = {
        rideId: outputRequestRide2.rideId,
        driverId: outputSignupDriver.accountId
    }
    await expect(() =>  acceptRide.execute(inputAcceptRide2)).rejects.toThrow(new Error("Driver is already in another ride"));
})