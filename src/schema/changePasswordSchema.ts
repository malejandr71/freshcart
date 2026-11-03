import * as z from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),
    password: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),
    rePassword: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20")
}).refine(function (data) {

    if (data.password === data.rePassword) {

        return true
    }

    return false

}, {

    path: ["rePassword"],
    error: "password dosnt match "
})



export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>
