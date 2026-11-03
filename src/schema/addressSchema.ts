import * as z from "zod";

export const addressSchema = z.object({
    name: z.string().min(2, "min Length 2"),
    details: z.string().min(3, "min Length 3"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "invaild phone number"),
    city: z.string().min(2, "min Length 2")
})



export type addressSchemaType = z.infer<typeof addressSchema>
