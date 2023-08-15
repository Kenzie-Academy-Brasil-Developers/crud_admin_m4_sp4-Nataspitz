import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import { User } from "../../interfaces"
import { client } from "../../database"
import { AppError } from "../../errors/error"

export const verifyUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const { id } = req.params

    const queryById: QueryConfig ={
        text:  `SELECT * FROM "users" WHERE "id" = $1;`,
        values: [id]
    } 

    const results: QueryResult<User> = await client.query(queryById)

    if (results.rowCount === 0) {
        throw new AppError("Developer not found", 404)
    }
    
    const user: User = results.rows[0]
    res.locals = { ...res.locals, user } 
   
    return next()
} 