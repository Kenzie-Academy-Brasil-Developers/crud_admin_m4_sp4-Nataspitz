import { Request, Response } from "express"
import { cancelCourse, createCourseRegistration, createNewCourse, listAllCourses } from "../../services"

export const createCourseController = async (req: Request ,res: Response): Promise<Response> =>{
    const { body } = req
    return res.status(201).json(await createNewCourse(body))
}

export const listAllCoursesController = async (req: Request ,res: Response): Promise<Response> =>{
    return res.status(200).json(await listAllCourses()) 
}

export const registrationCoursesController = async (req: Request ,res: Response): Promise<Response> =>{
    const { courseId, userId } = req.params
   const register = await createCourseRegistration( courseId, userId )
    return res.status(201).json({message: register}) 
}

export const cancelCourseController = async (req: Request ,res: Response): Promise<Response> =>{
    const { courseId, userId } = req.params
    await cancelCourse(courseId, userId)
    return res.status(204).send() 
}