import format from "pg-format"
import { ArrayCourse, Course, NewCourse } from "../../interfaces"
import { QueryResult } from "pg"
import { client } from "../../database"


export const createNewCourse = async (payload: NewCourse): Promise<Course> =>{
    const newCourseQuery: string = format(
        `INSERT INTO "courses" (%I) VALUES (%L)
        RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    ) 

    const courseResult: QueryResult<Course> = await client.query(newCourseQuery)
    return courseResult.rows[0]
}

export const listAllCourses = async (): Promise<ArrayCourse> =>{
    const listAllQuery: string = `SELECT * FROM "courses"`

    const listResult: QueryResult<Course> = await client.query(listAllQuery)
    return listResult.rows
}
