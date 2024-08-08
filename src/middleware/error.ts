import { NextFunction, Request, Response } from 'express'
import ErrorResponse from '../utils/errorResponse'

const errorHandeler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  res.status(500).json({
    success: false,
    data:err,
    error:'Server Error',
  })
}

export default errorHandeler
