import { NextFunction, Request, Response } from "express";


export const validateBody = ( schema: Zod.AnyZodObject) => (req: Request, res: Response, next: NextFunction):  void =>{
    req.body = schema.parse(req.body)
    return next()
}