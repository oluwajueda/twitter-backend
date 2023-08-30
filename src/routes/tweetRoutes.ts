import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const router = Router();
const prisma = new PrismaClient();


//Tweet CRUD

//create tweet
router.post("/", async(req, res) =>{ try {

    const {content, image, userId} = req.body

    const result = await prisma.tweet.create({
        data: {
            content,
            image,
            userId // TODO manage based on the auth user
        },
     });
     
     res.json(result);
} catch (e) {
    res.status(400).json({error: "Username and email should be unique"})
}

});


// List tweets
router.get("/", async(req, res) => {
    const allTweets = await prisma.tweet.findMany({include: {user: true}});
    res.json(allTweets);
})

// get one tweet
router.get("/:id", async(req, res) => {
    const {id} = req.params;
    const tweet = await prisma.tweet.findUnique({where: {id: Number(id)}})
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