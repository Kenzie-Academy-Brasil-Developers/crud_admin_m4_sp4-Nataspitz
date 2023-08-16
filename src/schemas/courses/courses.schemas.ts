import { z } from "zod";

export const coursesSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50).nonempty(),
    description: z.string().nonempty()
})

export const newCourseSchema = coursesSchema.omit({ id: true})
export const updateCourseSchema = newCourseSchema.partial()