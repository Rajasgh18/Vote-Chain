import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY!, (err: any, voter: any) => {
        if (err) return res.sendStatus(403);
        req.body.id = voter.voterId;
        next();
    });
};