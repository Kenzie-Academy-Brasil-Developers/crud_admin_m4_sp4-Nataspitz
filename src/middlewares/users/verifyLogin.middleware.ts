import { NextFunction, Request, Response } from "express"

export const verifyUserLogin = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
   const { authorization } = req.headers
   console.log(authorization);
   

   return next()
}