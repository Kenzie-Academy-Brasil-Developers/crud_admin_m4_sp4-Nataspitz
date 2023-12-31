import { z } from "zod"
import { coursesSchema, newCourseSchema } from "../../schemas"

export type Course = z.infer<typeof coursesSchema>
export type ArrayCourse = Array<Course>
export type NewCourse =  z.infer<typeof newCourseSchema>
export type UpdateCourse = z.infer<typeof newCourseSchema>

export interface CourseUser {
    userId: number,
    userName: string,
    courseId: number,
    courseName: string,
    courseDescription: string
    userActiveInCourse: boolean
}
