-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.accounts
(
    username character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(60) COLLATE pg_catalog."default" NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'passenger'::character varying,
    account_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    CONSTRAINT accounts_pkey PRIMARY KEY (account_uuid),
    CONSTRAINT unique_account_uuid UNIQUE (account_uuid),
    CONSTRAINT users_email_key UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.user_profiles
(
    full_name character varying(255) COLLATE pg_catalog."default",
    date_of_birth date,
    gender character varying(10) COLLATE pg_catalog."default",
    nationality character varying(50) COLLATE pg_catalog."default",
    id_number character varying(20) COLLATE pg_catalog."default",
    passport_number character varying(20) COLLATE pg_catalog."default",
    passport_expiry_date date,
    phone_number character varying(20) COLLATE pg_catalog."default",
    account_uuid uuid NOT NULL,
    CONSTRAINT user_profiles_pkey PRIMARY KEY (account_uuid)
);

CREATE TABLE IF NOT EXISTS public.tickets
(
    id serial NOT NULL,
    booked_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    guest_id integer,
    ticket_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_uuid uuid,
    seat_row integer NOT NULL,
    seat_column character varying(10) COLLATE pg_catalog."default" NOT NULL,
    flight_uuid uuid NOT NULL,
    price integer NOT NULL DEFAULT 0,
    CONSTRAINT tickets_pkey PRIMARY KEY (id),
    CONSTRAINT tickets_ticket_uuid UNIQUE (ticket_uuid),
    CONSTRAINT tickets_user_id UNIQUE (user_uuid)
);

CREATE TABLE IF NOT EXISTS public.flights
(
    id serial NOT NULL,
    origin character varying(255) COLLATE pg_catalog."default" NOT NULL,
    destination character varying(255) COLLATE pg_catalog."default" NOT NULL,
    departure_time timestamp with time zone NOT NULL,
    arrival_time timestamp with time zone,
    plane_id integer NOT NULL,
    status character varying(20) COLLATE pg_catalog."default" DEFAULT 'scheduled'::character varying,
    flight_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    CONSTRAINT flights_pkey PRIMARY KEY (id),
    CONSTRAINT flights_flight_id_key UNIQUE (flight_uuid)
);

CREATE TABLE IF NOT EXISTS public.planes
(
    id serial NOT NULL,
    model character varying(100) COLLATE pg_catalog."default" NOT NULL,
    capacity integer NOT NULL,
    manufacturer character varying(100) COLLATE pg_catalog."default" NOT NULL,
    seat_map jsonb NOT NULL DEFAULT '[]'::jsonb,
    CONSTRAINT planes_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.flight_seats
(
    id serial NOT NULL,
    seat_column character varying(10) COLLATE pg_catalog."default" NOT NULL,
    seat_class_id integer NOT NULL,
    price integer NOT NULL DEFAULT 0,
    is_booked boolean NOT NULL DEFAULT false,
    seat_row integer NOT NULL,
    flight_uuid uuid NOT NULL,
    CONSTRAINT flight_seats_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.seat_classes
(
    id serial NOT NULL,
    class character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT seat_classes_pkey PRIMARY KEY (id),
    CONSTRAINT seat_classes_class_name_key UNIQUE (class)
);

CREATE TABLE IF NOT EXISTS public.plane_seat_prices
(
    id serial NOT NULL,
    plane_model character varying(100) COLLATE pg_catalog."default" NOT NULL,
    seat_class_id integer NOT NULL,
    price numeric(10, 0) NOT NULL,
    CONSTRAINT plane_seat_prices_pkey PRIMARY KEY (id),
    CONSTRAINT plane_seat_prices_plane_model_seat_class_id_key UNIQUE (plane_model, seat_class_id)
);

CREATE TABLE IF NOT EXISTS public.guest_bookings
(
    id serial NOT NULL,
    full_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(20) COLLATE pg_catalog."default",
    date_of_birth date NOT NULL,
    gender character varying(10) COLLATE pg_catalog."default" NOT NULL,
    nationality character varying(50) COLLATE pg_catalog."default" NOT NULL,
    id_number character varying(20) COLLATE pg_catalog."default",
    passport_number character varying(20) COLLATE pg_catalog."default",
    passport_expiry_date date,
    CONSTRAINT guest_bookings_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.user_profiles
    ADD CONSTRAINT fk_user_profiles_account_uuid FOREIGN KEY (account_uuid)
    REFERENCES public.accounts (account_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS user_profiles_pkey
    ON public.user_profiles(account_uuid);


ALTER TABLE IF EXISTS public.tickets
    ADD CONSTRAINT fk_tickets_flight_uuid FOREIGN KEY (flight_uuid)
    REFERENCES public.flights (flight_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public.tickets
    ADD CONSTRAINT fk_tickets_user_id FOREIGN KEY (user_uuid)
    REFERENCES public.accounts (account_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS tickets_user_id
    ON public.tickets(user_uuid);


ALTER TABLE IF EXISTS public.tickets
    ADD CONSTRAINT tickets_guest_booking_id_fkey FOREIGN KEY (guest_id)
    REFERENCES public.guest_bookings (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.flights
    ADD CONSTRAINT flights_plane_id_fkey FOREIGN KEY (plane_id)
    REFERENCES public.planes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.flight_seats
    ADD CONSTRAINT fk_flight_seats_flight_uuid FOREIGN KEY (flight_uuid)
    REFERENCES public.flights (flight_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.flight_seats
    ADD CONSTRAINT flight_seats_seat_class_id_fkey FOREIGN KEY (seat_class_id)
    REFERENCES public.seat_classes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public.plane_seat_prices
    ADD CONSTRAINT plane_seat_prices_seat_class_id_fkey FOREIGN KEY (seat_class_id)
    REFERENCES public.seat_classes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT;

END;