import { QueryConfig, QueryResult } from "pg";
import { LoginUser, Token, User } from "../../interfaces";
import { client } from "../../database";
import { AppError } from "../../errors/error";
import { sign } from "jsonwebtoken";

export const generateToken = async (payload: LoginUser ): Promise<Token> =>{

    const emailQuery: QueryConfig ={
        text: `SELECT * FROM "users" WHERE "email" = $1;`,
        values: [payload.email]
    }

    const result: QueryResult<User> = await client.query(emailQuery)
    const user: User = result.rows[0]

    if (result.rowCount === 0) {
        throw new AppError("Wrong email/password", 401)
    }

    if (user.password !== payload.password) {
        throw new AppError("Wrong email/password", 401)
    }

    const token: string = sign(
       { name: user.name, admin: user.admin },
       process.env.SECRET_KEY!,
       { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
    )

    return { token }
}