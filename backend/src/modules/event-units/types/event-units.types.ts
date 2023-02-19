export type TCreateEventUnitsParam = {
  eventUnitList: Array<{
    name: string | null | void
    price: number | null | void
    venueId: number | null | void
    eventCategoryId: number | null | void
  }>
}
