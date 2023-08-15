import "express-async-errors"
import "dotenv/config";
import express, { Application, json } from 'express'
import { loginRoute, usersRoute } from "./routers";
import { handleErrors } from "./errors/handleError";

const app: Application = express()
app.use(json())

app.use("/users", usersRoute)
app.use("/login", loginRoute)

app.use(handleErrors)

export default app
