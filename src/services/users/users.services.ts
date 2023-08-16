import format from "pg-format";
import { ArrayUser, NewUser, PasswordOmite, User } from "../../interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { passwordOmitListSchema, passwordOmitSchema } from "../../schemas";

export const createNewUser = async (payload: NewUser): Promise<User> =>{
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