import { sql } from "@pgtyped/runtime"
import { IInsertAmenitiesSqlQuery } from "./create-amenities.queries.types"

export const insertAmenitiesSQL = sql<IInsertAmenitiesSqlQuery>`INSERT INTO amenity (name) VALUES $$amenityList(name)`
