import { TCreateEventUnitsParam } from "../types/event-units.types"
import { objectToSnake } from "ts-case-convert"
import { insertEventUnits } from "@/modules/event-units/queries/create-event-units/create-event-units.queries"
import { client } from "@/index"

export const eventUnitServices = {
  createEventUnits: async (eventUnitParams: TCreateEventUnitsParam) => {
    const mappedParams = {
      eventUnitList: eventUnitParams.eventUnitList.map((eventUnit) => {
        return objectToSnake<Readonly<typeof eventUnit>>(eventUnit)
      }),
    }

    const updated = await insertEventUnits.run(mappedParams, client)
    return updated
  },
}
