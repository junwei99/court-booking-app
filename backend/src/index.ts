import { apiErrorHandler } from "@/middlewares/api-error-handler.middlewares"
import { eventUnitRouter } from "@/modules/event-units/event-units.routes"
import { venueRouter } from "@/modules/venues/venues.routes"
import bodyParser from "body-parser"
import cors from "cors"
import { config } from "dotenv"
import express from "express"
import { Client } from "pg"
import { bookingsRouter } from "./modules/bookings/bookings.routes"

config()

const app = express()
export let client: Client

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routesList = [venueRouter, eventUnitRouter, bookingsRouter]

console.log("test github actions, bo")

const createConnection = async () => {
  let retries = 5

  while (retries) {
    const client = new Client({
      host: "db",
      // host: "localhost",
      port: 5432,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
    }) // Create a new client object for each connection attempt

    try {
      await client.connect()
      console.log("Connected to the database successfully hehe")
      return client
    } catch (error) {
      retries -= 1
      console.log(`Retries left: ${retries}`)

      if (retries === 0) {
        console.log("Error connecting to the database:", error.message)
      }

      await new Promise((res) => setTimeout(res, 5000))
    }
  }

  console.log("failed to create a database connection")
  throw new Error("Failed to create a database connection")
}

async function main() {
  try {
    console.log(
      "env variables: ",
      process.env.POSTGRES_USER,
      process.env.POSTGRES_DB
    )

    client = await createConnection()

    app.use(express.json())
    routesList.map((route) => app.use("/api", route))
    app.use(apiErrorHandler)
    app.listen(8080, () => {
      console.log("running on port 8080")
    })
  } catch (error) {
    console.log({ error })
  }
}

main()
