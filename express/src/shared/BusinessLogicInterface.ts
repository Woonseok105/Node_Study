import { NextFunction, Request, Response } from 'express';

export interface BusinessLogic {
    (req: Request, res: Response, next: NextFunction): any;
}