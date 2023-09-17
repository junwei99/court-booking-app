--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: junwei
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO junwei;

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
-- Name: booking_items; Type: TABLE; Schema: public; Owner: junwei
--

CREATE TABLE public.booking_items (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    event_unit_id integer,
    booking_start_date timestamp with time zone NOT NULL,
    booking_end_date timestamp with time zone NOT NULL,
    booking_id character varying NOT NULL
);


ALTER TABLE public.booking_items OWNER TO junwei;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: junwei
--

CREATE TABLE public.bookings (
    id character varying NOT NULL,
    guest_first_name character varying,
    guest_last_name character varying,
    guest_email character varying,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.booking_items.id;


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
-- Name: booking_items id; Type: DEFAULT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.booking_items ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


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
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
eae48e98-0aae-4a82-b8df-ba4c03318048	6e0aa2088f2f7a29fb555bb0ea2014b23dc7d057ac7455bee34429d187f1cfe5	2023-06-29 15:18:35.40469+08	0_init		\N	2023-06-29 15:18:35.40469+08	0
1cb5bbdc-122c-4de6-9721-73cfe94924d7	f5a05b3755858e50d214a65fb686575093d8b452a661f0c9816491612c722080	2023-06-29 15:22:16.402072+08	20230629072216_create_bookings_table	\N	\N	2023-06-29 15:22:16.395279+08	1
3901b0ba-4edc-4ddd-8d16-bb0468a06886	42a5263b1f4e5b6bbf25ad4a5037749883faa498502f59443d06b4bed0407044	2023-06-29 15:24:40.35645+08	20230629072440_total_amount_constraint	\N	\N	2023-06-29 15:24:40.350297+08	1
1484cd59-2337-4faf-8201-8dfdab3f996b	9fcb548f7bc03dca65897fd1c255f610b674b97ff3664cfae942a1dc4519ca9b	2023-06-29 16:55:37.973403+08	20230629085537_booking_id_foreign_key	\N	\N	2023-06-29 16:55:37.967861+08	1
8a32ba9f-03f7-420e-9f34-3cac577dc84d	d677850e7f28cb831eaf78c49444fecc3d649b8456944983afd64f35af515089	2023-07-02 16:20:06.742243+08	20230702082006_remove_unused_fields	\N	\N	2023-07-02 16:20:06.737868+08	1
\.


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
-- Data for Name: booking_items; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.booking_items (id, created_at, updated_at, event_unit_id, booking_start_date, booking_end_date, booking_id) FROM stdin;
34	2023-07-02 16:40:32.963559	2023-07-02 16:40:32.963559	11	2023-07-02 14:00:00+08	2023-07-02 16:00:00+08	15be0a88-5a15-42f4-91ce-fe2090afc990
35	2023-07-02 16:40:32.963559	2023-07-02 16:40:32.963559	12	2023-07-02 14:00:00+08	2023-07-02 16:00:00+08	15be0a88-5a15-42f4-91ce-fe2090afc990
36	2023-07-02 16:43:15.427976	2023-07-02 16:43:15.427976	11	2023-07-03 13:30:00+08	2023-07-03 15:30:00+08	4a7da2ac-c63f-4c10-a7e7-c810bbbc9f34
37	2023-07-02 16:43:15.427976	2023-07-02 16:43:15.427976	12	2023-07-03 13:30:00+08	2023-07-03 15:30:00+08	4a7da2ac-c63f-4c10-a7e7-c810bbbc9f34
38	2023-07-02 16:43:50.376254	2023-07-02 16:43:50.376254	11	2023-07-10 13:00:00+08	2023-07-10 15:00:00+08	f8a126a9-8249-49d0-96b5-4060982ed708
39	2023-07-02 16:43:50.376254	2023-07-02 16:43:50.376254	12	2023-07-10 13:00:00+08	2023-07-10 15:00:00+08	f8a126a9-8249-49d0-96b5-4060982ed708
40	2023-07-02 16:48:44.565357	2023-07-02 16:48:44.565357	11	2023-07-10 13:00:00+08	2023-07-10 15:00:00+08	6a5ba355-ef51-4e6e-aad2-ec80f3dcd61f
41	2023-07-02 16:48:44.565357	2023-07-02 16:48:44.565357	12	2023-07-10 13:00:00+08	2023-07-10 15:00:00+08	6a5ba355-ef51-4e6e-aad2-ec80f3dcd61f
42	2023-07-02 16:51:11.180776	2023-07-02 16:51:11.180776	11	2023-07-10 17:30:00+08	2023-07-10 19:30:00+08	e3108079-f06b-41f7-988d-65e747f3618b
43	2023-07-02 16:51:11.180776	2023-07-02 16:51:11.180776	12	2023-07-10 17:30:00+08	2023-07-10 19:30:00+08	e3108079-f06b-41f7-988d-65e747f3618b
44	2023-09-17 13:33:08.807363	2023-09-17 13:33:08.807363	11	2023-09-17 17:00:00+08	2023-09-17 19:00:00+08	bd697abb-a6b5-4b8e-ab87-9bf5c5bea16a
45	2023-09-17 13:33:08.807363	2023-09-17 13:33:08.807363	12	2023-09-17 17:00:00+08	2023-09-17 19:00:00+08	bd697abb-a6b5-4b8e-ab87-9bf5c5bea16a
46	2023-09-17 13:33:48.981757	2023-09-17 13:33:48.981757	11	2023-09-17 21:30:00+08	2023-09-17 23:00:00+08	916416f0-6d2d-4f20-9830-85a8a0eb8a8c
47	2023-09-17 13:33:48.981757	2023-09-17 13:33:48.981757	12	2023-09-17 21:30:00+08	2023-09-17 23:00:00+08	916416f0-6d2d-4f20-9830-85a8a0eb8a8c
48	2023-09-17 13:34:16.417722	2023-09-17 13:34:16.417722	11	2023-09-17 08:30:00+08	2023-09-17 10:30:00+08	137fe7f7-ad54-49ec-a451-2410db971aa1
49	2023-09-17 13:34:16.417722	2023-09-17 13:34:16.417722	12	2023-09-17 08:30:00+08	2023-09-17 10:30:00+08	137fe7f7-ad54-49ec-a451-2410db971aa1
50	2023-09-17 15:34:20.819164	2023-09-17 15:34:20.819164	11	2023-09-17 05:00:00+08	2023-09-17 07:00:00+08	2438bf51-41c4-4dce-b95b-414f613c49a0
51	2023-09-17 15:34:20.819164	2023-09-17 15:34:20.819164	12	2023-09-17 05:00:00+08	2023-09-17 07:00:00+08	2438bf51-41c4-4dce-b95b-414f613c49a0
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.bookings (id, guest_first_name, guest_last_name, guest_email, created_at, updated_at) FROM stdin;
15be0a88-5a15-42f4-91ce-fe2090afc990	Jun Wei	Low	lowjunwei1999@gmail.com	2023-07-02 16:40:32.960521	2023-07-02 16:40:32.960521
4a7da2ac-c63f-4c10-a7e7-c810bbbc9f34	Jun Wei	Low	lowjunwei1999@gmail.com	2023-07-02 16:43:15.425267	2023-07-02 16:43:15.425267
f8a126a9-8249-49d0-96b5-4060982ed708	Jun Wei	Low	lowjunwei1999@gmail.com	2023-07-02 16:43:50.372576	2023-07-02 16:43:50.372576
6a5ba355-ef51-4e6e-aad2-ec80f3dcd61f	Jun Wei	Low	lowjunwei1999@gmail.com	2023-07-02 16:48:44.561488	2023-07-02 16:48:44.561488
e3108079-f06b-41f7-988d-65e747f3618b	Jun Wei	Low	lowjunwei1999@gmail.com	2023-07-02 16:51:11.179496	2023-07-02 16:51:11.179496
bd697abb-a6b5-4b8e-ab87-9bf5c5bea16a	junwei	low	lowjunwei1999@gmail.com	2023-09-17 13:33:08.803739	2023-09-17 13:33:08.803739
916416f0-6d2d-4f20-9830-85a8a0eb8a8c	junwei	low	lowjunwei1999@gmail.com	2023-09-17 13:33:48.980119	2023-09-17 13:33:48.980119
137fe7f7-ad54-49ec-a451-2410db971aa1	Jun Wei	Low	lowjunwei1999@gmail.com	2023-09-17 13:34:16.415982	2023-09-17 13:34:16.415982
2438bf51-41c4-4dce-b95b-414f613c49a0	Jun Wei	Low	lowjunwei1999@gmail.com	2023-09-17 15:34:20.81506	2023-09-17 15:34:20.81506
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

SELECT pg_catalog.setval('public.bookings_id_seq', 51, true);


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
-- Name: booking_items PK_bee6805982cc1e248e94ce94957; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.booking_items
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
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


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
-- Name: booking_items FK_3e628ac28c72541c6678bf9598e; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.booking_items
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
-- Name: booking_items booking_items_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: junwei
--

ALTER TABLE ONLY public.booking_items
    ADD CONSTRAINT booking_items_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

