import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import { AppError } from "../../errors/error"
import { User } from "../../interfaces"
import { client } from "../../database"

export const verifyUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const { email } = req.body

    if (!email) {
        return next()
    }

    const emailQuery: QueryConfig ={
        text: `SELECT * FROM "users" WHERE "email" = $1;`,
        values: [email]
    }   

    
    const results: QueryResult<User> = await client.query(emailQuery)
    const emailExists = results.rows[0]

    if (emailExists) {
        throw new AppError("Email already registered", 409)
    }

      return  next()
}