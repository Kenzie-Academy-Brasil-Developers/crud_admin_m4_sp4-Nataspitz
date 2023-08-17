import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import { AppError } from "../../errors/error"
import { Course } from "../../interfaces"
import { client } from "../../database"

export const verifyIdsForRegister = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const { courseId, userId } = req.params

    const courseQuery: QueryConfig ={
        text: `SELECT * FROM "courses" WHERE "id" = $1;`,
        values: [courseId]
    }   

    const userQuery: QueryConfig ={
        text: `SELECT * FROM "users" WHERE "id" = $1;`,
        values: [userId]
    } 

    
    const courseResults: QueryResult<Course> = await client.query(courseQuery)
    const courseExists = courseResults.rows[0]

    const userResults: QueryResult<Course> = await client.query(courseQuery)
    const userExists = userResults.rows[0]

    if (!userExists) {
        throw new AppError("User/course not found", 404)
    }

    if (!courseExists) {
        throw new AppError("User/course not found", 404)
    }

      return  next()
}