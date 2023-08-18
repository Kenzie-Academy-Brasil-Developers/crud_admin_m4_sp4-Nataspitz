import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import { AppError } from "../../errors/error"
import { Course } from "../../interfaces"
import { client } from "../../database"

export const verifyIdUserForRegister = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const { userId } = req.params

    const userQuery: QueryConfig ={
        text: `SELECT * FROM "users" WHERE "id" = $1;`,
        values: [userId]
    }   

    
    const userResults: QueryResult<Course> = await client.query(userQuery)
    const userExists = userResults.rows[0]

    if (!userExists) {
        throw new AppError("User/course not found", 404)
    }

      return  next()
}