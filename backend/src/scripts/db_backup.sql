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
-- Name: amenity; Type: TABLE; Schema: public; Owner: junwei
--

CREATE TABLE public.amenity (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.amenity OWNER TO junwei;

--
-- Name: amenity_id_seq; Type: SEQUENCE; Schema: public; Owner: junwei
--

CREATE SEQUENCE public.amenity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.amenity_id_seq OWNER TO junwei;

--
-- Name: amenity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: junwei
--

ALTER SEQUENCE public.amenity_id_seq OWNED BY public.amenity.id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: junwei
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    event_unit_id integer,
    booking_start_date timestamp with time zone NOT NULL,
    booking_end_date timestamp with time zone NOT NULL
);


ALTER TABLE public.bookings OWNER TO junwei;

--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: junwei
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookings_id_seq OWNER TO junwei;

--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: junwei
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: event_categories; Type: TABLE; Schema: public; Owner: junwei
--

CREATE TABLE public.event_categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    type character varying NOT NULL
);


ALTER TABLE public.event_categories OWNER TO junwei;

--
-- Name: event_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: junwei
--

CREATE SEQUENCE public.event_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_categories_id_seq OWNER TO junwei;

--
-- Name: event_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: junwei
--

ALTER SEQUENCE public.event_categories_id_seq OWNED BY public.event_categories.id;


--
-- Name: event_units; Type: TABLE; Schema: public; Owner: junwei
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


ALTER TABLE public.event_units OWNER TO junwei;

--
-- Name: event_units_id_seq; Type: SEQUENCE; Schema: public; Owner: junwei
--

CREATE SEQUENCE public.event_units_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_units_id_seq OWNER TO junwei;

--
-- Name: event_units_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: junwei
--

ALTER SEQUENCE public.event_units_id_seq OWNED BY public.event_units.id;


--
-- Name: location; Type: TABLE; Schema: public; Owner: junwei
--

CREATE TABLE public.location (
    id integer NOT NULL,
    name character varying NOT NULL,
    location_type character varying NOT NULL
);


ALTER TABLE public.location OWNER TO junwei;

--
-- Name: location_id_seq; Type: SEQUENCE; Schema: public; Owner: junwei
--

CREATE SEQUENCE public.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.location_id_seq OWNER TO junwei;

--
-- Name: location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: junwei
--

ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;


--
-- Name: venue; Type: TABLE; Schema: public; Owner: junwei
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


ALTER TABLE public.venue OWNER TO junwei;

--
-- Name: venue_amenities; Type: TABLE; Schema: public; Owner: junwei
--

CREATE TABLE public.venue_amenities (
    amenity_id integer NOT NULL,
    venue_id integer NOT NULL
);


ALTER TABLE public.venue_amenities OWNER TO junwei;

--
-- Name: venue_event_categories; Type: TABLE; Schema: public; Owner: junwei
--

CREATE TABLE public.venue_event_categories (
    venue_id integer NOT NULL,
    event_category_id integer NOT NULL
);


ALTER TABLE public.venue_event_categories OWNER TO junwei;

--
-- Name: venue_id_seq; Type: SEQUENCE; Schema: public; Owner: junwei
--

CREATE SEQUENCE public.venue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.venue_id_seq OWNER TO junwei;

--
-- Name: venue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: junwei
--

ALTER SEQUENCE public.venue_id_seq OWNED BY public.venue.id;


--
-- Name: amenity id; Type: DEFAULT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.amenity ALTER COLUMN id SET DEFAULT nextval('public.amenity_id_seq'::regclass);


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: event_categories id; Type: DEFAULT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.event_categories ALTER COLUMN id SET DEFAULT nextval('public.event_categories_id_seq'::regclass);


--
-- Name: event_units id; Type: DEFAULT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.event_units ALTER COLUMN id SET DEFAULT nextval('public.event_units_id_seq'::regclass);


--
-- Name: location id; Type: DEFAULT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);


--
-- Name: venue id; Type: DEFAULT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.venue ALTER COLUMN id SET DEFAULT nextval('public.venue_id_seq'::regclass);


--
-- Data for Name: amenity; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.amenity (id, name) FROM stdin;
13	Surau
14	Hostel
15	Parking
16	Shop
17	Beverages
18	Shower
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.bookings (id, created_at, updated_at, event_unit_id, booking_start_date, booking_end_date) FROM stdin;
9	2022-11-15 15:50:19.118157	2022-11-15 15:50:19.118157	11	2023-01-08 18:30:00.593+08	2023-01-08 20:30:39.433+08
10	2022-11-15 15:50:19.118157	2022-11-15 15:50:19.118157	12	2023-01-08 18:30:00.593+08	2023-01-08 20:30:39.433+08
\.


--
-- Data for Name: event_categories; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.event_categories (id, name, type) FROM stdin;
7	Futsal	sports
9	Swimming	sports
8	Dance	sports
10	Volleyball	sports
11	Table Tennis	sports
12	Badminton	sports
\.


--
-- Data for Name: event_units; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.event_units (id, name, price, created_at, updated_at, venue_id, event_category_id) FROM stdin;
11	Court A	20	2022-11-14 18:14:51.244315	2022-11-14 18:14:51.244315	20	12
12	Court B	25	2022-11-14 18:14:51.244315	2022-11-14 18:14:51.244315	20	12
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.location (id, name, location_type) FROM stdin;
1	Petaling Jaya	city
2	Kuala Lumpur	city
\.


--
-- Data for Name: venue; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.venue (id, title, address, description, min_price, max_price, phone_num, website, images, social_media, location_id) FROM stdin;
4	Forum 19 Badminton and Table tennis centre	1, Jalan 19/1b, Seksyen 19, Petaling Jaya, Selangor, Malaysia	Forum 19 is located right next to TOC Automotive College and is opposite Perodua Sentral at Seksyen 19. Sharing the same compound with Forum 19 is MuayFit Petaling Jaya. Easy parking within the compound for our customers!	5	10	0123456789	https://google.com.my	{https://3.bp.blogspot.com/-vAVhFe4SHgg/XNEL5TTkwFI/AAAAAAAAbrw/2sopLMv5AfIrmkpDdw4n5bIWEdzqy6hPQCLcBGAs/w1200-h630-p-k-no-nu/Forum%2B19%2B01.jpg,https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/kfsyzuaoipfhm4qonqci,https://fastly.4sqi.net/img/general/600x600/18763332_CCoQq87QXlH6nIUfUKg7FF8k6SoN_cdtuGVCvphzgIU.jpg,https://placeimg.com/800/200/arch,https://placeimg.com/800/200/arch}	[{"link": "https://facebook.com", "type": "facebook"}]	1
19	222 Sports Centre PJ	222 Sports Centre PJ, Jalan 51a/225, Seksyen 51a, 46100 Petaling Jaya, Selangor, Malaysia	Forum 19 is located right next to TOC Automotive College and is opposite Perodua Sentral at Seksyen 19. Sharing the same compound with Forum 19 is MuayFit Petaling Jaya. Easy parking within the compound for our customers!	7	14	0123018225	https://www.wikipedia.org/	{https://3.bp.blogspot.com/-vAVhFe4SHgg/XNEL5TTkwFI/AAAAAAAAbrw/2sopLMv5AfIrmkpDdw4n5bIWEdzqy6hPQCLcBGAs/w1200-h630-p-k-no-nu/Forum%2B19%2B01.jpg,https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/kfsyzuaoipfhm4qonqci,https://fastly.4sqi.net/img/general/600x600/18763332_CCoQq87QXlH6nIUfUKg7FF8k6SoN_cdtuGVCvphzgIU.jpg,https://placeimg.com/800/200/arch,https://placeimg.com/800/200/arch}	[{"link": "https://instagram.com", "type": "instagram"}, {"link": "https://facebook.com", "type": "facebook"}, {"link": "https://tiktok.com", "type": "tiktok"}]	1
20	KL City Arena	Kompleks Sukan ISN Jalan Raja Muda, Kampung Baru, 50300, Kuala Lumpur	Forum 19 is located right next to TOC Automotive College and is opposite Perodua Sentral at Seksyen 19. Sharing the same compound with Forum 19 is MuayFit Petaling Jaya. Easy parking within the compound for our customers!	10	20	60163862176	https://www.facebook.com/	{https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRmVqTVR1MjFJaElSYlVEd1FvM3VxazA5ajlzZjItYjI4NmU4ODctYTg1NS00NmMyLWI1NDAtODJjM2FlZmY0NjM4LmpwZz9hbHQ9bWVkaWEmdG9rZW49OWE3M2UzMzctMjlmNi00YmJjLWI4NGUtYzRiNGNhMGM0YzJi.webp,https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRmVqTVR1MjFJaElSYlVEd1FvM3VxazA5ajlzZjItMDIxOTgwOWMtZjk3NS00ZDViLWJkNGQtMzFiNWQyYjMzN2Q1LmpwZz9hbHQ9bWVkaWEmdG9rZW49YmJjYTlkNzYtYzhjZC00ZTg2LThhMTMtZjgxOTA3N2Q2NTM1.webp,https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRmVqTVR1MjFJaElSYlVEd1FvM3VxazA5ajlzZjItMjBlMTMyY2UtYzAyOS00M2FlLWI1ODQtNDViYWZmYTI0M2EzLmpwZz9hbHQ9bWVkaWEmdG9rZW49NDBmODM3YjEtMmZlMy00MWFhLWE0OTQtNWY2MWVmYmNkYWQz.webp,https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRmVqTVR1MjFJaElSYlVEd1FvM3VxazA5ajlzZjItNjM3YjM4MTctOTU0Ni00NGQ2LTkxMzctM2Q3NWM2MDFiMjdhLmpwZz9hbHQ9bWVkaWEmdG9rZW49OWFhYjUzNzEtMWM5Yi00YWRjLWJmNjQtZGMxM2IyNTI0NjZl.webp,https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRm9tMmZwcXZmdWxPOGJNaDFiWXpUeUU0aXowSzMtODQzOWJiYTEtNDIzMS00MDk4LTlkOGMtNWM2MzBjNGU1ZDBiLnBuZz9hbHQ9bWVkaWEmdG9rZW49ZWIzMDI2YzktYjkwMy00OTdiLTg3ODctYjVmNGYyOWQxNjQ0.webp}	[{"link": "https://instagram.com", "type": "instagram"}, {"link": "https://facebook.com", "type": "facebook"}]	2
\.


--
-- Data for Name: venue_amenities; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.venue_amenities (amenity_id, venue_id) FROM stdin;
13	19
14	19
15	19
13	20
14	20
15	20
16	20
17	20
18	20
\.


--
-- Data for Name: venue_event_categories; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.venue_event_categories (venue_id, event_category_id) FROM stdin;
19	7
19	10
19	12
20	7
20	10
20	12
4	12
\.


--
-- Name: amenity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.amenity_id_seq', 24, true);


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.bookings_id_seq', 12, true);


--
-- Name: event_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.event_categories_id_seq', 15, true);


--
-- Name: event_units_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.event_units_id_seq', 28, true);


--
-- Name: location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.location_id_seq', 2, true);


--
-- Name: venue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.venue_id_seq', 34, true);


--
-- Name: venue_amenities PK_0bce6c38a68d1b1c4062f4f1863; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.venue_amenities
    ADD CONSTRAINT "PK_0bce6c38a68d1b1c4062f4f1863" PRIMARY KEY (amenity_id, venue_id);


--
-- Name: venue_event_categories PK_217dbb805556e107d04a6b804a1; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.venue_event_categories
    ADD CONSTRAINT "PK_217dbb805556e107d04a6b804a1" PRIMARY KEY (venue_id, event_category_id);


--
-- Name: location PK_876d7bdba03c72251ec4c2dc827; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY (id);


--
-- Name: event_units PK_8cd68d0b514b52c1142548f5fea; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.event_units
    ADD CONSTRAINT "PK_8cd68d0b514b52c1142548f5fea" PRIMARY KEY (id);


--
-- Name: event_categories PK_a6368447a61afbf9def09fd81af; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.event_categories
    ADD CONSTRAINT "PK_a6368447a61afbf9def09fd81af" PRIMARY KEY (id);


--
-- Name: bookings PK_bee6805982cc1e248e94ce94957; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY (id);


--
-- Name: venue PK_c53deb6d1bcb088f9d459e7dbc0; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.venue
    ADD CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY (id);


--
-- Name: amenity PK_f981de7b1a822823e5f31da10dc; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.amenity
    ADD CONSTRAINT "PK_f981de7b1a822823e5f31da10dc" PRIMARY KEY (id);


--
-- Name: IDX_0f9fe236e0586d9693998864c8; Type: INDEX; Schema: public; Owner: junwei
--

CREATE INDEX "IDX_0f9fe236e0586d9693998864c8" ON public.venue_event_categories USING btree (venue_id);


--
-- Name: IDX_12725c60b6e328ce52061f958c; Type: INDEX; Schema: public; Owner: junwei
--

CREATE INDEX "IDX_12725c60b6e328ce52061f958c" ON public.venue_amenities USING btree (amenity_id);


--
-- Name: IDX_52aa3f633512f7a025e288ba8e; Type: INDEX; Schema: public; Owner: junwei
--

CREATE INDEX "IDX_52aa3f633512f7a025e288ba8e" ON public.venue_amenities USING btree (venue_id);


--
-- Name: IDX_d0712ae4a17f24c8ffa47f31a6; Type: INDEX; Schema: public; Owner: junwei
--

CREATE INDEX "IDX_d0712ae4a17f24c8ffa47f31a6" ON public.venue_event_categories USING btree (event_category_id);


--
-- Name: venue FK_0e415f584ec4eb5369dcd665a50; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.venue
    ADD CONSTRAINT "FK_0e415f584ec4eb5369dcd665a50" FOREIGN KEY (location_id) REFERENCES public.location(id) ON DELETE CASCADE;


--
-- Name: venue_event_categories FK_0f9fe236e0586d9693998864c8e; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.venue_event_categories
    ADD CONSTRAINT "FK_0f9fe236e0586d9693998864c8e" FOREIGN KEY (venue_id) REFERENCES public.venue(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: venue_amenities FK_12725c60b6e328ce52061f958c1; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.venue_amenities
    ADD CONSTRAINT "FK_12725c60b6e328ce52061f958c1" FOREIGN KEY (amenity_id) REFERENCES public.amenity(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bookings FK_3e628ac28c72541c6678bf9598e; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "FK_3e628ac28c72541c6678bf9598e" FOREIGN KEY (event_unit_id) REFERENCES public.event_units(id) ON DELETE CASCADE;


--
-- Name: venue_amenities FK_52aa3f633512f7a025e288ba8eb; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.venue_amenities
    ADD CONSTRAINT "FK_52aa3f633512f7a025e288ba8eb" FOREIGN KEY (venue_id) REFERENCES public.venue(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_units FK_951f2415425313b016bef6b4ebb; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.event_units
    ADD CONSTRAINT "FK_951f2415425313b016bef6b4ebb" FOREIGN KEY (event_category_id) REFERENCES public.event_categories(id) ON DELETE CASCADE;


--
-- Name: event_units FK_c7f7bd764118dd45c88a8203665; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.event_units
    ADD CONSTRAINT "FK_c7f7bd764118dd45c88a8203665" FOREIGN KEY (venue_id) REFERENCES public.venue(id) ON DELETE CASCADE;


--
-- Name: venue_event_categories FK_d0712ae4a17f24c8ffa47f31a65; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.venue_event_categories
    ADD CONSTRAINT "FK_d0712ae4a17f24c8ffa47f31a65" FOREIGN KEY (event_category_id) REFERENCES public.event_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

