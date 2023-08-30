import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();



//User CRUD

//create user
router.post("/", async(req, res) =>{
    const {email, name, username} = req.body
    try {
        const result = await prisma.user.create({
            data: {
             email,
             name,
             username,
             bio: "Hello, I'm new on Twitter"
            }
         })
         
         res.json(result);
    } catch (e) {
        res.status(400).json({error: "Username and email should be unique"})
    }
 
});


// List users
router.get("/", async(req, res) => {

 
    const allUser = await prisma.user.findMany();
 
    res.json(allUser)
})

// get one user
router.get("/:id", async(req, res) => {
    const {id} = req.params;

    const user = await prisma.user.findUnique({where: {id: Number(id)}})
   res.json(user)
})

//update user
router.put("/:id", (req, res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not Implemented: ${id}`})
})

//delete user
router.delete("/:id", async(req, res) => {
    const {id} = req.params;
    const{bio, name, image} = req.body;

    try {
        const result = await prisma.user.update({
            where: {id: Number(id)},
            data:{
             bio, name, image
            }
        })
    } catch (e) {
        
    }
    res.status(501).json({error: `Not Implemented: ${id}`})
});

export default router;