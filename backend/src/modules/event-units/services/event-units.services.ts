import { client } from "@/index"
import {
  IInsertEventUnitsParams,
  insertEventUnits,
} from "@/modules/event-units/queries/create-event-units.queries"

export const eventUnitServices = {
  createEventUnits: async (eventUnitParams: IInsertEventUnitsParams) => {
    const updated = await insertEventUnits.run(eventUnitParams, client)
    return updated
  },
}
