import { Request, Response } from "express"
import { createNewCourse, listAllCourses } from "../../services"

export const createCourseController = async (req: Request ,res: Response): Promise<Response> =>{
    const { body } = req
    return res.status(201).json(await createNewCourse(body))
}

export const listAllCoursesController = async (req: Request ,res: Response): Promise<Response> =>{
    return res.status(200).json(await listAllCourses()) 
}