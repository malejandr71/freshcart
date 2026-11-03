import * as z from "zod";

export const updateMeSchema = z.object({
    name: z.string().min(3, "min Length 3").max(20, "max Length 20"),
    email: z.email("invalid Email"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "invaild phone number")
})



export type updateMeSchemaType = z.infer<typeof updateMeSchema>
