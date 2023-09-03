import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";


const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'SUPER SECRET';
console.log("JWT secret", JWT_SECRET);




type AuthRequest = Request & { user?: User };

export async function authenticateToken(req: AuthRequest, res:Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    console.log(authHeader);

    const jwtToken = authHeader?.split(' ')[1];
    if(!jwtToken){
        return res.sendStatus(401);
    }
    //decode  the jwt token

    try {
        const payload = (await jwt.verify(jwtToken, JWT_SECRET)) as {
            tokenId: number
        };
        const dbToken = await prisma.token.findUnique({
            where: {id: payload.tokenId},
            include:{user: true},
        })
        
        if(!dbToken?.valid || dbToken.expiration < new Date()){
           return res.status(401).json({error: "API token expired"});
        }
       
        console.log(dbToken.user);
        req.user = dbToken.user
        
    } catch (e) {
        console.log(e);
        
        return res.sendStatus(401);
    }

    next()

}