import * as z from "zod";

export const forgotPasswordSchema = z.object({
    email: z.email("invalid Email")
})

export const resetCodeSchema = z.object({
    resetCode: z.string().min(4, "invalid Code")
})

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20")
})



export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>
export type resetCodeSchemaType = z.infer<typeof resetCodeSchema>
export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>
