import {connectToDB} from "@utils/database"
import Prompt from "@models/Prompt"

export const GET = async (request)=>{
    try{

        // connect to database
        await connectToDB();


        // obtain all prompt document. 
        // replace the creator reference field with the actual referenced data
        const prompts = await Prompt.find({}).populate("creator")

        // return the result in a Response object
        return new Response(JSON.stringify(prompts), {status: 200})

    }catch (error){
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}