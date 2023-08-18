import format from "pg-format";
import { ArrayUser, NewUser, PasswordOmite, User, UserCourse } from "../../interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { passwordOmitListSchema, passwordOmitSchema } from "../../schemas";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/error";

export const createNewUser = async (payload: NewUser): Promise<User> =>{
    payload.password = await hash(payload.password, 10)

    const newUserQuery: string = format(
        `INSERT INTO "users" (%I) VALUES (%L)
        RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    ) 

    const userResult: QueryResult<User> = await client.query(newUserQuery)
    return userResult.rows[0]
}

export const loginUser = async (payload: NewUser): Promise<User> =>{
    
    const loginUserQuery: string = format(
        `INSERT INTO "users" (%I) VALUES (%L)
        RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    ) 

    const userResult: QueryResult<User> = await client.query(loginUserQuery)
    return userResult.rows[0]
}



export const listAllUsers = async (): Promise<Array<PasswordOmite>> =>{
    const listAllQuery: string = `SELECT * FROM "users"`

    const listResult: QueryResult<PasswordOmite> = await client.query(listAllQuery)
    const users = listResult.rows
    return passwordOmitListSchema.parse(users)
}

export const listSingleUser = async (id: string): Promise<PasswordOmite> =>{
    const listUserQuery: QueryConfig ={
        text: `SELECT * FROM "users" WHERE "id" = $1`,
        values: [id]
    }

    const listResult = await client.query(listUserQuery)
    return passwordOmitSchema.parse(listResult.rows[0])
}

export const listCoursesByUser = async (id: string): Promise<UserCourse[]> =>{
    const listQuery: QueryConfig ={
        text: `SELECT
        uc."courseId" AS "courseId",
        c."name" AS "courseName",
        c."description" AS "courseDescription",
        uc."active" AS "userActiveInCourse",
        u."id" AS "userId",
        u."name" AS "userName"
        FROM
        "userCourses" uc
        JOIN
        "users" u ON uc."userId" = u."id"
        JOIN
        "courses" c ON uc."courseId" = c."id"
        WHERE u."id" = $1
    `,
    values: [id]
    }

    const result: QueryResult<UserCourse> = await client.query(listQuery)

    if (result.rowCount === 0) {
        throw new AppError("No course found", 404)
    }
    
    return result.rows
}