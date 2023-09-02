import {Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient()

//endpoints

// Generate a random digit number as the email token
function generateEmailToken(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Create a user if it doesn't exist
// generate the emailToken and send it to their email
router.post("/login", async(req, res)=>{
    const {email} = req.body;

    //generate a token

    const emailToken = generateEmailToken();

    const createdToken 

})

//validate the emailToken
//Generate a long-lived JWT token

router.post("/authenticate", async(req, res)=> {

})


export default router;