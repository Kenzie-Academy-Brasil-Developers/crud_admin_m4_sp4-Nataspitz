import { Router } from "express";
import { validateBody, validatePermission, verifyToken } from "../../middlewares";
import { createCourseController } from "../../controllers";
import { newCourseSchema } from "../../schemas";

export const cousersRoutes: Router = Router() 

cousersRoutes.use(verifyToken, validatePermission)

cousersRoutes.post("", validateBody(newCourseSchema), createCourseController)
cousersRoutes.get("")
cousersRoutes.post("/:courseId/users/:userId")
cousersRoutes.patch("/:courseId/users/:userId")
cousersRoutes.delete("/courses/:id/users")