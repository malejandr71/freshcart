import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("invalid Email"),
    password: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),

})


export  type LoginSchemaType = z.infer<typeof loginSchema>
