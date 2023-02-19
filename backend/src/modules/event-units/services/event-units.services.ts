import { TCreateEventUnitsParam } from "@/modules/event-units/types/event-units.types"
import { insertEventUnits } from "@/modules/event-units/queries/create-event-units/create-event-units.queries"
import { client } from "@/index"
import {
  IInsertEventCategoriesParams,
  insertEventCategories,
} from "@/modules/event-units/queries/create-event-categories/create-event-categories.queries"
import {
  IQueryEventCategoriesOfVenueParams,
  queryEventCategoriesOfVenue,
} from "../queries/query-event-categories-of-venue/query-event-categories-of-venue.queries"

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

export const getEventCategoriesOfVenueService = async (
  venueId: IQueryEventCategoriesOfVenueParams["venueId"]
) => {
  const eventCategoryListOfVenue = await queryEventCategoriesOfVenue.run(
    { venueId },
    client
  )
  return eventCategoryListOfVenue
}
