import { TCreateEventUnitsParam } from "@/modules/event-units/types/event-units.types"
import { insertEventUnits } from "@/modules/event-units/queries/create-event-units/create-event-units.queries"
import { client } from "@/index"
import {
  IInsertEventCategoriesParams,
  insertEventCategories,
} from "@/modules/event-units/queries/create-event-categories/create-event-categories.queries"

export const createEventUnitsService = async (
  eventUnitParams: TCreateEventUnitsParam
) => {
  const createdEventUnitIds = await insertEventUnits.run(
    eventUnitParams,
    client
  )
  return createdEventUnitIds
}

export const createEventCategoriesService = async (
  eventCategoryParams: IInsertEventCategoriesParams
) => {
  const createdEventCategoryIds = await insertEventCategories.run(
    eventCategoryParams,
    client
  )
  return createdEventCategoryIds
}
