--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: amenity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.amenity (
    id integer NOT NULL,
    name character varying NOT NULL
);


--
-- Name: amenity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.amenity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: amenity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.amenity_id_seq OWNED BY public.amenity.id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    event_unit_id integer,
    booking_start_date timestamp with time zone NOT NULL,
    booking_end_date timestamp with time zone NOT NULL
);


--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: event_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    type character varying NOT NULL
);


--
-- Name: event_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.event_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: event_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.event_categories_id_seq OWNED BY public.event_categories.id;


--
-- Name: event_units; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_units (
    id integer NOT NULL,
    name character varying NOT NULL,
    price integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    venue_id integer,
    event_category_id integer
);


--
-- Name: event_units_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.event_units_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: event_units_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.event_units_id_seq OWNED BY public.event_units.id;


--
-- Name: location; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.location (
    id integer NOT NULL,
    name character varying NOT NULL,
    location_type character varying NOT NULL
);


--
-- Name: location_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;


--
-- Name: venue; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venue (
    id integer NOT NULL,
    title character varying NOT NULL,
    address character varying NOT NULL,
    description character varying NOT NULL,
    min_price integer NOT NULL,
    max_price integer NOT NULL,
    phone_num character varying NOT NULL,
    website character varying NOT NULL,
    images text[] DEFAULT '{}'::text[] NOT NULL,
    social_media jsonb DEFAULT '[]'::jsonb,
    location_id integer
);


--
-- Name: venue_amenities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venue_amenities (
    amenity_id integer NOT NULL,
    venue_id integer NOT NULL
);


--
-- Name: venue_event_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venue_event_categories (
    venue_id integer NOT NULL,
    event_category_id integer NOT NULL
);


--
-- Name: venue_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.venue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: venue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.venue_id_seq OWNED BY public.venue.id;


--
-- Name: amenity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.amenity ALTER COLUMN id SET DEFAULT nextval('public.amenity_id_seq'::regclass);


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: event_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_categories ALTER COLUMN id SET DEFAULT nextval('public.event_categories_id_seq'::regclass);


--
-- Name: event_units id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_units ALTER COLUMN id SET DEFAULT nextval('public.event_units_id_seq'::regclass);


--
-- Name: location id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);


--
-- Name: venue id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue ALTER COLUMN id SET DEFAULT nextval('public.venue_id_seq'::regclass);


--
-- Name: venue_amenities PK_0bce6c38a68d1b1c4062f4f1863; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_amenities
    ADD CONSTRAINT "PK_0bce6c38a68d1b1c4062f4f1863" PRIMARY KEY (amenity_id, venue_id);


--
-- Name: venue_event_categories PK_217dbb805556e107d04a6b804a1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_event_categories
    ADD CONSTRAINT "PK_217dbb805556e107d04a6b804a1" PRIMARY KEY (venue_id, event_category_id);


--
-- Name: location PK_876d7bdba03c72251ec4c2dc827; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY (id);


--
-- Name: event_units PK_8cd68d0b514b52c1142548f5fea; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_units
    ADD CONSTRAINT "PK_8cd68d0b514b52c1142548f5fea" PRIMARY KEY (id);


--
-- Name: event_categories PK_a6368447a61afbf9def09fd81af; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_categories
    ADD CONSTRAINT "PK_a6368447a61afbf9def09fd81af" PRIMARY KEY (id);


--
-- Name: bookings PK_bee6805982cc1e248e94ce94957; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY (id);


--
-- Name: venue PK_c53deb6d1bcb088f9d459e7dbc0; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue
    ADD CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY (id);


--
-- Name: amenity PK_f981de7b1a822823e5f31da10dc; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.amenity
    ADD CONSTRAINT "PK_f981de7b1a822823e5f31da10dc" PRIMARY KEY (id);


--
-- Name: IDX_0f9fe236e0586d9693998864c8; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_0f9fe236e0586d9693998864c8" ON public.venue_event_categories USING btree (venue_id);


--
-- Name: IDX_12725c60b6e328ce52061f958c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_12725c60b6e328ce52061f958c" ON public.venue_amenities USING btree (amenity_id);


--
-- Name: IDX_52aa3f633512f7a025e288ba8e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_52aa3f633512f7a025e288ba8e" ON public.venue_amenities USING btree (venue_id);


--
-- Name: IDX_d0712ae4a17f24c8ffa47f31a6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_d0712ae4a17f24c8ffa47f31a6" ON public.venue_event_categories USING btree (event_category_id);


--
-- Name: venue FK_0e415f584ec4eb5369dcd665a50; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue
    ADD CONSTRAINT "FK_0e415f584ec4eb5369dcd665a50" FOREIGN KEY (location_id) REFERENCES public.location(id) ON DELETE CASCADE;


--
-- Name: venue_event_categories FK_0f9fe236e0586d9693998864c8e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_event_categories
    ADD CONSTRAINT "FK_0f9fe236e0586d9693998864c8e" FOREIGN KEY (venue_id) REFERENCES public.venue(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: venue_amenities FK_12725c60b6e328ce52061f958c1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_amenities
    ADD CONSTRAINT "FK_12725c60b6e328ce52061f958c1" FOREIGN KEY (amenity_id) REFERENCES public.amenity(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bookings FK_3e628ac28c72541c6678bf9598e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "FK_3e628ac28c72541c6678bf9598e" FOREIGN KEY (event_unit_id) REFERENCES public.event_units(id) ON DELETE CASCADE;


--
-- Name: venue_amenities FK_52aa3f633512f7a025e288ba8eb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_amenities
    ADD CONSTRAINT "FK_52aa3f633512f7a025e288ba8eb" FOREIGN KEY (venue_id) REFERENCES public.venue(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_units FK_951f2415425313b016bef6b4ebb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_units
    ADD CONSTRAINT "FK_951f2415425313b016bef6b4ebb" FOREIGN KEY (event_category_id) REFERENCES public.event_categories(id) ON DELETE CASCADE;


--
-- Name: event_units FK_c7f7bd764118dd45c88a8203665; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_units
    ADD CONSTRAINT "FK_c7f7bd764118dd45c88a8203665" FOREIGN KEY (venue_id) REFERENCES public.venue(id) ON DELETE CASCADE;


--
-- Name: venue_event_categories FK_d0712ae4a17f24c8ffa47f31a65; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_event_categories
    ADD CONSTRAINT "FK_d0712ae4a17f24c8ffa47f31a65" FOREIGN KEY (event_category_id) REFERENCES public.event_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

