import { z } from "zod";

export const usersSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50).nonempty(),
    email: z.string().email().max(50).nonempty(),
    password: z.string().max(120).nonempty(),
    admin: z.boolean().default(false)
})

export const newUserSchema = usersSchema.omit({id: true})
export const updateUserSchema = newUserSchema.partial()

export const loginSchema = usersSchema.pick({
    email: true,
    password: true,
  });

