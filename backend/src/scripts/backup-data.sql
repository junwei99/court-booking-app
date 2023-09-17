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

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
081ff228-e152-41a8-9764-60bacdf98a39	2398d5a80d72b56a87cc364eb6bf4cb697229849f1360d27052180b9a2335bcf	2023-09-17 18:00:57.603904+08	20230917100057_use_prisma	\N	\N	2023-09-17 18:00:57.588459+08	1
\.


--
-- Data for Name: amenity; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.amenity (id, name) FROM stdin;
1	Hostel
2	Beverages
3	Surau
4	Parking
5	Shop
6	Shower
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.bookings (id, guest_first_name, guest_last_name, guest_email, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: event_categories; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.event_categories (id, name, type) FROM stdin;
1	Futsal	sports
2	Badminton	sports
3	Table Tennis	sports
4	Volleyball	sports
5	Dance	sports
6	Swimming	sports
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
1	KL City Arena	Kompleks Sukan ISN Jalan Raja Muda, Kampung Baru, 50300, Kuala Lumpur	Forum 19 is located right next to TOC Automotive College and is opposite Perodua Sentral at Seksyen 19. Sharing the same compound with Forum 19 is MuayFit Petaling Jaya. Easy parking within the compound for our customers!	10	20	60163862176	https://www.facebook.com/	{https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRmVqTVR1MjFJaElSYlVEd1FvM3VxazA5ajlzZjItYjI4NmU4ODctYTg1NS00NmMyLWI1NDAtODJjM2FlZmY0NjM4LmpwZz9hbHQ9bWVkaWEmdG9rZW49OWE3M2UzMzctMjlmNi00YmJjLWI4NGUtYzRiNGNhMGM0YzJi.webp,https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRmVqTVR1MjFJaElSYlVEd1FvM3VxazA5ajlzZjItMDIxOTgwOWMtZjk3NS00ZDViLWJkNGQtMzFiNWQyYjMzN2Q1LmpwZz9hbHQ9bWVkaWEmdG9rZW49YmJjYTlkNzYtYzhjZC00ZTg2LThhMTMtZjgxOTA3N2Q2NTM1.webp,https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRmVqTVR1MjFJaElSYlVEd1FvM3VxazA5ajlzZjItMjBlMTMyY2UtYzAyOS00M2FlLWI1ODQtNDViYWZmYTI0M2EzLmpwZz9hbHQ9bWVkaWEmdG9rZW49NDBmODM3YjEtMmZlMy00MWFhLWE0OTQtNWY2MWVmYmNkYWQz.webp,https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRmVqTVR1MjFJaElSYlVEd1FvM3VxazA5ajlzZjItNjM3YjM4MTctOTU0Ni00NGQ2LTkxMzctM2Q3NWM2MDFiMjdhLmpwZz9hbHQ9bWVkaWEmdG9rZW49OWFhYjUzNzEtMWM5Yi00YWRjLWJmNjQtZGMxM2IyNTI0NjZl.webp,https://img.courtsite.my/insecure/rs:auto:1920:0:0/g:sm/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9jb3VydHNpdGUtdGVycmFmb3JtLmFwcHNwb3QuY29tL28vY2VudHJlSW1hZ2VzJTJGY2w5dXp6aG4wMDd0dzA3YzloN3JzNjR6OSUyRm9tMmZwcXZmdWxPOGJNaDFiWXpUeUU0aXowSzMtODQzOWJiYTEtNDIzMS00MDk4LTlkOGMtNWM2MzBjNGU1ZDBiLnBuZz9hbHQ9bWVkaWEmdG9rZW49ZWIzMDI2YzktYjkwMy00OTdiLTg3ODctYjVmNGYyOWQxNjQ0.webp}	[{"link": "https://instagram.com", "type": "instagram"}, {"link": "https://facebook.com", "type": "facebook"}]	\N
\.


--
-- Data for Name: event_units; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.event_units (id, name, price, created_at, updated_at, venue_id, event_category_id) FROM stdin;
1	Court A	20	2023-09-17 18:34:15.492139	2023-09-17 18:34:15.492139	1	2
2	Court B	25	2023-09-17 18:34:15.492139	2023-09-17 18:34:15.492139	1	2
\.


--
-- Data for Name: booking_items; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.booking_items (id, created_at, updated_at, event_unit_id, booking_start_date, booking_end_date, booking_id) FROM stdin;
\.


--
-- Data for Name: venue_amenities; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.venue_amenities (amenity_id, venue_id) FROM stdin;
1	1
2	1
3	1
4	1
5	1
6	1
\.


--
-- Data for Name: venue_event_categories; Type: TABLE DATA; Schema: public; Owner: junwei
--

COPY public.venue_event_categories (venue_id, event_category_id) FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
\.


--
-- Name: amenity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.amenity_id_seq', 6, true);


--
-- Name: booking_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.booking_items_id_seq', 1, false);


--
-- Name: event_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.event_categories_id_seq', 6, true);


--
-- Name: event_units_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.event_units_id_seq', 2, true);


--
-- Name: location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.location_id_seq', 1, false);


--
-- Name: venue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: junwei
--

SELECT pg_catalog.setval('public.venue_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

