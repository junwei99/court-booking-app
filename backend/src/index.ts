import express from "express"
import cors from "cors"
// import { apiErrorHandler } from "@/middlewares/api-error-handler"
import path from "path"
import bodyParser from "body-parser"
import { Client } from "pg"
import { venueRouter } from "@/modules/venues/venues.routes"
import { apiErrorHandler } from "@/middlewares/api-error-handler.middlewares"
import { eventUnitRouter } from "@/modules/event-units/event-units.routes"

export const client = new Client({
  host: "localhost",
  port: 5432,
  user: "junwei",
  database: "court-booking-app",
})

const app = express()

app.use(cors())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../src/views"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routesList = [venueRouter, eventUnitRouter]

async function main() {
  try {
    await client.connect()
    app.use(express.json())
    routesList.map((route) => app.use("/api", route))
    app.use(apiErrorHandler)
    app.listen(8081, () => {
      console.log("running on port 8081")
    })
  } catch (error) {
    console.log({ error })
  }
}

main()
