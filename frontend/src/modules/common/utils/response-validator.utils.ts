import {
  object,
  string,
  enum as zodEnum,
  type ZodObject,
  type ZodTypeAny,
} from "zod"

export const validateResponse = <
  TResponse extends Record<string, unknown>,
  TZodSchema extends ZodObject<Record<string, ZodTypeAny>>
>(
  response: TResponse,
  zodSchema: TZodSchema
) => {
  const baseResponseSchema = object({
    status: zodEnum(["success", "error"]).refine(
      (value) => value !== "error",
      "error status when fetching"
    ),
    message: string(),
  })

  return baseResponseSchema.and(zodSchema).safeParse(response)
}
