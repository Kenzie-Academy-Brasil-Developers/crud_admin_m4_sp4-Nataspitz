import { Router } from "express";
import { validateBody, validatePermission, verifyToken, verifyUserEmail, verifyUserId } from "../../middlewares";
import { loginSchema, newUserSchema } from "../../schemas";
import { createUserController, loginUserController, listAlluserController } from "../../controllers";

export const usersRoute: Router = Router()
export const loginRoute: Router = Router()

usersRoute.post("", validateBody(newUserSchema), verifyUserEmail, createUserController)
loginRoute.post("", validateBody(loginSchema), loginUserController)
usersRoute.get("", verifyToken, listAlluserController)
usersRoute.get("/:id/courses", verifyUserId, verifyToken, validatePermission)