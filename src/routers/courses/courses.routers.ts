import { Router } from "express";
import { validateBody, validatePermission, verifyIdCoursForRegister, verifyIdCourse, verifyIdUserForRegister, verifyToken, verifyUserId } from "../../middlewares";
import { cancelCourseController, createCourseController, listAllCoursesController, listUsersByCourseController, registrationCoursesController } from "../../controllers";
import { newCourseSchema } from "../../schemas";

export const cousersRoutes: Router = Router() 

cousersRoutes.post("/", verifyToken, validatePermission, validateBody(newCourseSchema), createCourseController)
cousersRoutes.get("/", listAllCoursesController)
cousersRoutes.get("/:id/users", verifyToken, validatePermission, verifyIdCourse, listUsersByCourseController)
cousersRoutes.post("/:courseId/users/:userId", verifyToken, validatePermission , verifyIdCoursForRegister, registrationCoursesController)
cousersRoutes.delete("/:courseId/users/:userId", verifyToken, validatePermission, verifyIdCoursForRegister, verifyIdUserForRegister, cancelCourseController)