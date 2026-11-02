import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().min(4, "min Length 3").max(20, "max Length 20"),
    email: z.email("invalid Email"),
    password: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),
    rePassword: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "invaild phone number")
}).refine(function (data) {

    if (data.password === data.rePassword) {

        return true
    }

    return false

}, {

    path: ["rePassword"],
    error: "password dosnt match "
})



export type registerSchemaType = z.infer<typeof registerSchema>
