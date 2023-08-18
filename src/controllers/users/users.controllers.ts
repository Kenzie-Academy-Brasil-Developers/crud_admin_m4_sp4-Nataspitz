import { Request, Response } from "express";
import { createNewUser, generateToken, listAllUsers, listSingleUser, loginUser } from "../../services";
import { passwordOmitSchema } from "../../schemas";
import { listCoursesByUser } from "../../services/users/users.services";

export const createUserController = async (req: Request ,res: Response): Promise<Response> =>{
    const create = await createNewUser(req.body)
    const newBody = passwordOmitSchema.parse(create)
    return res.status(201).json(newBody)
}

export const loginUserController = async (req: Request ,res: Response): Promise<Response> =>{
    const { body } = req
    return res.status(200).json(await generateToken(body)) 
}

export const listAlluserController = async (req: Request ,res: Response): Promise<Response> =>{
    return res.status(200).json(await listAllUsers()) 
}

export const ListSingleUserController = async (req: Request ,res: Response): Promise<Response> =>{
    const { id } = req.body
    return res.status(200).json(await listSingleUser(id)) 
}

export const ListCoursesUserController = async (req: Request ,res: Response): Promise<Response> =>{
    const { id } = req.params
    return res.status(200).json(await listCoursesByUser(id)) 
}