-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.flight_seats
(
    id serial NOT NULL,
    flight_id integer NOT NULL,
    seat_number character varying(10) COLLATE pg_catalog."default" NOT NULL,
    seat_class_id integer NOT NULL,
    price numeric(10, 0) NOT NULL,
    is_booked boolean NOT NULL DEFAULT false,
    booked_by_user_id integer,
    CONSTRAINT flight_seats_pkey PRIMARY KEY (id),
    CONSTRAINT flight_seats_flight_id_seat_number_key UNIQUE (flight_id, seat_number)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    username character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" DEFAULT 'passenger'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.tickets
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    flight_id integer NOT NULL,
    seat_number character varying(10) COLLATE pg_catalog."default" NOT NULL,
    booked_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tickets_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.flights
(
    id serial NOT NULL,
    flight_number character varying(10) COLLATE pg_catalog."default" NOT NULL,
    origin character varying(100) COLLATE pg_catalog."default" NOT NULL,
    destination character varying(100) COLLATE pg_catalog."default" NOT NULL,
    departure_time timestamp without time zone NOT NULL,
    arrival_time timestamp without time zone NOT NULL,
    plane_id integer NOT NULL,
    status character varying(20) COLLATE pg_catalog."default" DEFAULT 'scheduled'::character varying,
    CONSTRAINT flights_pkey PRIMARY KEY (id),
    CONSTRAINT flights_flight_number_key UNIQUE (flight_number)
);

CREATE TABLE IF NOT EXISTS public.planes
(
    id serial NOT NULL,
    model character varying(100) COLLATE pg_catalog."default" NOT NULL,
    capacity integer NOT NULL,
    manufacturer character varying(100) COLLATE pg_catalog."default" NOT NULL,
    seat_map jsonb,
    CONSTRAINT planes_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.seat_classes
(
    id serial NOT NULL,
    class_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT seat_classes_pkey PRIMARY KEY (id),
    CONSTRAINT seat_classes_class_name_key UNIQUE (class_name)
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

ALTER TABLE IF EXISTS public.flight_seats
    ADD CONSTRAINT flight_seats_booked_by_user_id_fkey FOREIGN KEY (booked_by_user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.flight_seats
    ADD CONSTRAINT flight_seats_flight_id_fkey FOREIGN KEY (flight_id)
    REFERENCES public.flights (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.flight_seats
    ADD CONSTRAINT flight_seats_seat_class_id_fkey FOREIGN KEY (seat_class_id)
    REFERENCES public.seat_classes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.tickets
    ADD CONSTRAINT tickets_flight_id_fkey FOREIGN KEY (flight_id)
    REFERENCES public.flights (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.tickets
    ADD CONSTRAINT tickets_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.flights
    ADD CONSTRAINT flights_plane_id_fkey FOREIGN KEY (plane_id)
    REFERENCES public.planes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.plane_seat_prices
    ADD CONSTRAINT plane_seat_prices_seat_class_id_fkey FOREIGN KEY (seat_class_id)
    REFERENCES public.seat_classes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE RESTRICT;

END;