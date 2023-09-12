DROP SCHEMA cccat13 cascade;

CREATE SCHEMA cccat13;

CREATE TABLE cccat13.account (
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