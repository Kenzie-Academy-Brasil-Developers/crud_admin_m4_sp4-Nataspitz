import format from "pg-format"
import { ArrayCourse, Course, CourseUser, NewCourse } from "../../interfaces"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"
import { promise } from "zod"
import { AppError } from "../../errors/error"


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

export const createCourseRegistration = async (courseId: string, userId: string): Promise<string> =>{
    const registrationQuery: QueryConfig ={
        text: `INSERT INTO "userCourses"("courseId", "userId") VALUES ($1, $2)`,
        values: [courseId, userId]
    }

    await client.query(registrationQuery)

    return  "User successfully vinculed to course"
}

export const cancelCourse = async (courseId: string, userId: string): Promise<void> =>{
    const cancelQuery: QueryConfig ={
        text: `UPDATE "userCourses" SET "active" = false
                WHERE "courseId" = $1 AND "userId" = $2 `,
        values: [courseId, userId]
    }

    await client.query(cancelQuery)
}

export const listUsersByCourse = async (id: string): Promise<CourseUser[]> =>{
    const listQuery: QueryConfig ={
        text: `SELECT
        uc."userId" AS "userId",
        u."name" AS "userName",
        uc."courseId" AS "courseId",
        c."name" AS "courseName",
        c."description" AS "courseDescription",
        uc."active" AS "userActiveInCourse"
        FROM
        "userCourses" uc
        JOIN
        "users" u ON uc."userId" = u."id"
        JOIN
        "courses" c ON uc."courseId" = c."id"
        WHERE
        c."id" = $1;
    `,
    values: [id]
    }

    const result: QueryResult<CourseUser> = await client.query(listQuery)

    if (result.rowCount === 0) {
        throw new AppError("No course found", 404)
    }
    
    return result.rows
}