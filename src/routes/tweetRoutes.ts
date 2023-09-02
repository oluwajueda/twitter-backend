import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import jwt from "jsonwebtoken";


const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = 'SUPER SECRET';


//Tweet CRUD

//create tweet
router.post("/", async(req, res) =>{
    
    
    const {content, image, } = req.body
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
        
    } catch (e) {
        console.log(e);
        
        return res.sendStatus(401);
    }
    res.sendStatus(200);

    
//     try {

   

//     const result = await prisma.tweet.create({
//         data: {
//             content,
//             image,
//             userId // TODO manage based on the auth user
//         },
//      });
     
//      res.json(result);
// } catch (e) {
//     res.status(400).json({error: "Username and email should be unique"})
// }

});


// List tweets
router.get("/", async(req, res) => {
    const allTweets = await prisma.tweet.findMany({
        include: {user: {
            select :{
                id: true,
                name: true,
                username: true,
                image:true
            }
        }},
        // select: {
        //     id: true,
        //     content: true,
        //     user:{
        //         select:{

        //             id: true,
        //             name: true,
        //             username: true,
        //             image:true,
        //         },
            
        //     },
        // },
    });
    res.json(allTweets);
})

// get one tweet
router.get("/:id", async(req, res) => {
    const {id} = req.params;
    const tweet = await prisma.tweet.findUnique({where: {id: Number(id)}, include:{
      user: true  
    }})
    if(!tweet){
    return    res.status(404).json({error: "Tweet not found"})
    }
    res.json(tweet)
})

// //update tweet
// router.put("/:id", (req, res) => {
//     const {id} = req.params;
//     res.status(501).json({error: `Not Implemented: ${id}`})
// })

//delete tweet
router.delete("/:id", async(req, res) => {
    const {id} = req.params;
    await prisma.tweet.delete({where: { id: Number(id)}})
    res.sendStatus(200);
});

export default router;