import express from 'express';
import Thread from '../models/Thread.js';
import getQuorAiResponse from '../utils/quorAi.js';
import axios from 'axios';
const router = express.Router();


//test route
router.post('/test', async(req, res)=>{
    try{
        const thread=new Thread({
            threadId: "abc",
            title: "2nd Sample Thread for Testig Purposes"
        });

        const response= await thread.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to save in DB"});
    }
});


//Get all threads
router.get('/thread', async(req, res)=>{
    try{
        const threads= await Thread.find({}).sort({updatedAt:-1});
        //descending order of updatedAt ---most recent data on the top
        res.json(threads);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
});


//Get a specific thread by ID
router.get("/thread/:threadId", async(req, res)=>{
    const {threadId}= req.params;
    try{
        const thread=await Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error:"Thread not Found"});
        }
        res.json(thread.messages);

    }catch(err){
        console.log(err);
        res.status(500).json({error:" Failed to fetch thread"});
    }
});


//delete a thread by ID
router.delete('/thread/:threadId', async(req, res)=>{
    const {threadId}= req.params;
    try{
        const deletedThread=await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error:"Thread not Found"});
        }
        res.status(200).json({success: "Thread Deleted Successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to delete thread"});
    }
});


//handle chat messages
router.post('/chat', async (req, res)=>{
    const {threadId, message}= req.body;
    
    if(!threadId || !message){
        res.status(400).json({error: "threadId and message are required"});
    }
    try{
        let thread = await Thread.findOne({threadId});

        if(!thread){

            //create a new thread in DB
            thread= new Thread({
                threadId,
                title: message,
                messages: [{role: 'user', content: message}]
            });
        } else{
            //update existing thread
            if (!thread.messages) thread.messages = [];
            thread.messages.push({role: 'user', content: message});
        }

//         //get response from QuorAI
        const assistantReply = await getQuorAiResponse(message, process.env.PERPLEXITY_API_KEY, "https://api.perplexity.ai/chat/completions", process.env.PERPLEXITY_MODEL || "sonar-pro");

//         //push assistant reply to thread
        thread.messages.push({role: 'assistant', content : assistantReply});
        thread.updatedAt= new Date();

//         //save thread to DB
        await thread.save();

//         //send response to client
        return res.json({reply: assistantReply});

    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Something Went Wrong, Try Again."})
    }
});



export default router;