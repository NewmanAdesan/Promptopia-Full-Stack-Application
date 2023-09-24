import {connectToDB} from "@utils/database"
import Prompt from "@models/Prompt"


export const GET = async (request, {params})=>{
    try{

        // connect to database
        await connectToDB();

        if (!params.promptId) return new Response("Prompt ID was not Specified", {status: 404})

        const prompt = await Prompt.findById(params.promptId).populate("creator");

        // return the result in a Response object
        return new Response(JSON.stringify(prompt), {status: 200})

    }catch (error){
        return new Response("Failed to fetch prompt details", {status: 500})
    }
}



export const PATCH = async (request, {params}) => {

    // extract information from request
    const { prompt, tag } = await request.json();

    try{

        // connect to database
        await connectToDB();

        // obtain the prompt document
        if (!params.promptId) return new Response("Prompt ID was not Specified", {status: 404})
        const existingPrompt = await Prompt.findById(params.promptId);
        if (!existingPrompt) return new Response("Prompt not Found", {status: 404})

        // update the prompt document
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        // return the result in a Response object
        return new Response(JSON.stringify(existingPrompt), {status: 200})

    }catch (error){
        return new Response("Failed to update prompt", {status: 500})
    }
}