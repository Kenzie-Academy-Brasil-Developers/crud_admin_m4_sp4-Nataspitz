import { Router } from "express";
import { validateBody, validatePermission, verifyIdsForRegister, verifyToken, verifyUserId } from "../../middlewares";
import { cancelCourseController, createCourseController, listAllCoursesController, registrationCoursesController } from "../../controllers";
import { newCourseSchema } from "../../schemas";

export const cousersRoutes: Router = Router() 

//cousersRoutes.use(verifyToken, validatePermission)

cousersRoutes.post("/", verifyToken, validatePermission, validateBody(newCourseSchema), createCourseController)
cousersRoutes.get("/", listAllCoursesController)
cousersRoutes.get("/courses/:id/users")
cousersRoutes.post("/:courseId/users/:userId", verifyToken, validatePermission ,verifyIdsForRegister, registrationCoursesController)
cousersRoutes.delete("/:courseId/users/:userId", verifyToken, validatePermission, verifyIdsForRegister, cancelCourseController)