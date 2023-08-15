import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/error";

export const validatePermission = (req: Request, res: Response, next: NextFunction): void =>{
    const { id } = req.params
    const { sub, admin } = res.locals.decoded

    if (admin) return next()

    if (sub !== id) {
        throw new AppError("Insufficient permission", 403)
    }
}