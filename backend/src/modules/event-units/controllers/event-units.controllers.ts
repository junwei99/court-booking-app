import { Request, Response } from "express"
import { TReqBody, TReqQuery } from "@/modules/common/types/common.types"
import {
  createEventCategoriesService,
  createEventUnitsService,
  getEventCategoriesOfVenueService,
} from "@/modules/event-units/services/event-units.services"
import { TCreateEventUnitsParam } from "@/modules/event-units/types/event-units.types"
import { HandledError } from "@/modules/common/utils/HandledError.utils"
import { IInsertEventCategoriesParams } from "@/modules/event-units/queries/create-event-categories/create-event-categories.queries"
import { IQueryEventCategoriesOfVenueParams } from "@/modules/event-units/queries/query-event-categories-of-venue/query-event-categories-of-venue.queries"
import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"

//TODO: wrong req type, it is using snake case, should use camel case
export const createEventUnitsCtrl = async (
  req: Request<{}, {}, TCreateEventUnitsParam>,
  res: Response
) => {
  const createEventUnitsParam = req.body

  //TODO: should convert the ids to number first
  const createdEventUnitIdList = await createEventUnitsService(
    createEventUnitsParam
  )

  if (createdEventUnitIdList.length > 0) {
    const apiRes = new ApiRes(res)

    return apiRes.sendSuccessRes(
      { createdEventUnitIdList },
      "Event units created successfully"
    )
  }

  throw new HandledError("Event units creation failed")
}

export const createEventCategoriesCtrl = async (
  req: Request<{}, {}, IInsertEventCategoriesParams>,
  res: Response
) => {
  const createEventCategoriesParams = req.body

  const createdEventCategoryIdList = await createEventCategoriesService(
    createEventCategoriesParams
  )

  if (createdEventCategoryIdList.length > 0) {
    const apiRes = new ApiRes(res)

    return apiRes.sendSuccessRes(
      { createdEventCategoryIdList },
      "Event categories created successfully"
    )
  }

  throw new HandledError("Event categories creation failed")
}

export const getEventCategoriesOfVenueCtrl = async (
  req: Request<IQueryEventCategoriesOfVenueParams>,
  res: Response
) => {
  const { venueId } = req.params

  const eventCategoryList = await getEventCategoriesOfVenueService(venueId)

  if (eventCategoryList?.length >= 0) {
    const apiRes = new ApiRes(res)

    return apiRes.sendSuccessRes(
      { eventCategoryList },
      `Event categories for venue ${venueId} fetched successfully`
    )
  }

  throw new HandledError(`failed to fetch event categories of venue ${venueId}`)
}
