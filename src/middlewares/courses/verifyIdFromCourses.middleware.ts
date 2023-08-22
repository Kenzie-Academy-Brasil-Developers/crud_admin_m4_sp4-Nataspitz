import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import { Course } from "../../interfaces"
import { client } from "../../database"
import { AppError } from "../../errors/error"

export const verifyIdCourse = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const { id } = req.params

    const userQuery: QueryConfig ={
        text: `SELECT * FROM "users" WHERE "id" = $1;`,
        values: [id]
    }   

    
    const userResults: QueryResult<Course> = await client.query(userQuery)
    const userExists = userResults.rows[0]

    if (!userExists) {
        throw new AppError("course not found", 404)
    }

      return  next()
}