DROP SCHEMA ridedb cascade;

CREATE SCHEMA ridedb;

CREATE TABLE ridedb.account (
    account_id uuid,
    name text,
    email text, 
    cpf text,
    car_plate text,
    is_passenger boolean,
    is_driver boolean,
    date timestamp,
    is_verified boolean,
    verification_code uuid
);