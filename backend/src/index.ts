import { apiErrorHandler } from "@/middlewares/api-error-handler.middlewares"
import { eventUnitRouter } from "@/modules/event-units/event-units.routes"
import { venueRouter } from "@/modules/venues/venues.routes"
import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import { Client } from "pg"
import { bookingsRouter } from "./modules/bookings/bookings.routes"

require("dotenv").config()

export const client = new Client({
  host: "db",
  port: 5432,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
})

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routesList = [venueRouter, eventUnitRouter, bookingsRouter]

const createConnection = async () => {
  let retries = 5

  while (retries) {
    try {
      await client.connect()
      break
    } catch (error) {
      retries -= 1
      console.log(`retries left: ${retries}`)
      await new Promise((res) => setTimeout(res, 5000))
    }
  }
}

async function main() {
  try {
    await createConnection()
    app.use(express.json())
    routesList.map((route) => app.use("/api", route))
    app.use(apiErrorHandler)
    app.listen(8080, () => {
      console.log("running on port 8081")
    })
  } catch (error) {
    console.log({ error })
  }
}

main()
