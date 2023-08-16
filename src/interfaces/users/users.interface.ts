import { z } from "zod"
import { loginSchema, newUserSchema, passwordOmitSchema, usersSchema } from "../../schemas"

export type User = z.infer<typeof usersSchema>
export type ArrayUser = Array<User>
export type NewUser =  z.infer<typeof newUserSchema>
export type PasswordOmite =  z.infer<typeof passwordOmitSchema>
export type LoginUser = z.infer<typeof loginSchema>
export type Token = { token: string }