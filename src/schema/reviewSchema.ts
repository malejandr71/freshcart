import * as z from "zod";

export const reviewSchema = z.object({
    review: z.string().min(3, "min Length 3"),
    rating: z.number().min(1, "min rating 1").max(5, "max rating 5")
})



export type reviewSchemaType = z.infer<typeof reviewSchema>
