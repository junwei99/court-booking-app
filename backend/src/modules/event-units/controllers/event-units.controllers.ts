import { Response } from "express"
import { TReqBody, TReqQuery } from "@/modules/common/types/common.types"
import {
  createEventCategoriesService,
  createEventUnitsService,
  getEventCategoriesOfVenueService,
} from "@/modules/event-units/services/event-units.services"
import { TCreateEventUnitsParam } from "@/modules/event-units/types/event-units.types"
import { API_STATUS_CODES } from "@/modules/common/constants/apis.constants"
import { HandledError } from "@/modules/common/utils/ValidationError.utils"
import { IInsertEventCategoriesParams } from "@/modules/event-units/queries/create-event-categories/create-event-categories.queries"
import { IQueryEventCategoriesOfVenueParams } from "../queries/query-event-categories-of-venue/query-event-categories-of-venue.queries"

//TODO: wrong req type, it is using snake case, should use camel case
export const createEventUnitsCtrl = async (
  req: TReqBody<TCreateEventUnitsParam>,
  res: Response
) => {
  const createEventUnitsParam = req.body

  //TODO: should convert the ids to number first
  const createdEventUnitIds = await createEventUnitsService(
    createEventUnitsParam
  )

  if (createdEventUnitIds.length > 0) {
    res.json({
      status: API_STATUS_CODES.SUCCESS,
      message: "Event units created successfully",
      createdEventUnitIdList: createdEventUnitIds,
    })
  }

  throw new HandledError("Event units creation failed")
}

export const createEventCategoriesCtrl = async (
  req: TReqBody<IInsertEventCategoriesParams>,
  res: Response
) => {
  const createEventCategoriesParams = req.body

  const createdEventCategoryIds = await createEventCategoriesService(
    createEventCategoriesParams
  )

  if (createdEventCategoryIds.length > 0) {
    res.json({
      status: API_STATUS_CODES.SUCCESS,
      message: "Event categories created successfully",
      createdEventCategoryIdList: createdEventCategoryIds,
    })
  }

  throw new HandledError("Event categories creation failed")
}

export const getEventCategoriesOfVenueCtrl = async (
  req: TReqQuery<IQueryEventCategoriesOfVenueParams>,
  res: Response
) => {
  const { venueId } = req.params

  const eventCategoryListOfVenue = await getEventCategoriesOfVenueService(
    venueId
  )

  if (eventCategoryListOfVenue?.length >= 0) {
    res.json({
      status: API_STATUS_CODES.SUCCESS,
      message: `Event categories for venue ${venueId} fetched successfully`,
      eventCategoryList: eventCategoryListOfVenue,
    })
  }

  throw new HandledError(`failed to fetch event categories of venue ${venueId}`)
}
