# Court Booking App (work in progress)

## Description

A simple sports venue booking app inspired by Courtsite

## Tech stack

#### Frontend

- Typescript, Vue, Vite, Tailwind, Vant

#### Backend

- Typescript (Node), Express, PgTyped, PostgreSQL

## Reasoning

#### Why don't you use an ORM? (Prisma, TypeORM, MikroORM, etc..)

Main purpose of this project is to learn all components of a backend application without all the abstractions, All SQL queries are wrote by hand. PgTyped is used to easily automate the process of making db data typesafe in the backend

#### Why Vue instead of React?

I am using Vue in my day job and wanted to build a project using it.

Here are what I noticed coming from a React background:

Upsides:

1. Vue rendering system feels much cleaner than React as it selectively update DOM nodes as opposed to rerendering the whole component with React.
2. I find that Vue 3 apis are quite clean when compared to React (e.g. onMounted vs useEffect)
3. Pinia is a very enjoyable state management library to use
4. Vue Official Docs are great :)

Downsides:

1. Less libraries options compared to React, a lot of Vue libraries are not compatible with Vue3 :(
2. A lot of interesting meta frameworks or framework agnostic solutions often times have first class support with React, Vue feels like 2nd class citizen a lot of times.
