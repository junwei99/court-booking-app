import { TCreateEventUnitsParam } from "@/modules/event-units/types/event-units.types"
import { insertEventUnits } from "@/modules/event-units/queries/create-event-units/create-event-units.queries"
import { client } from "@/index"

export const eventUnitServices = {
  createEventUnits: async (eventUnitParams: TCreateEventUnitsParam) => {
    const updated = await insertEventUnits.run(eventUnitParams, client)
    return updated
  },
}
