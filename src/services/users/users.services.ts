import format from "pg-format";
import { ArrayUser, NewUser, User } from "../../interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

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
    console.log("primeiro log");
    
    const loginUserQuery: string = format(
        `INSERT INTO "users" (%I) VALUES (%L)
        RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    ) 

    const userResult: QueryResult<User> = await client.query(loginUserQuery)
    return userResult.rows[0]
}



export const listAllUsers = async (): Promise<ArrayUser> =>{
    const listAllQuery: string = `SELECT * FROM "users"`

    const listResult: QueryResult<User> = await client.query(listAllQuery)
    return listResult.rows
}

export const listSingleUser = async (id: string): Promise<User> =>{
    const listUserQuery: QueryConfig ={
        text: `SELECT * FROM "users" WHERE "id" = $1`,
        values: [id]
    }

    const listResult = await client.query(listUserQuery)
    return listResult.rows[0]
}