import {connectToDB} from "@utils/database"
import Prompt from "@models/Prompt"

export const GET = async (request, {params})=>{
    try{

        // connect to database
        await connectToDB();
        let prompts;

        if (params.userId) {
            prompts = await Prompt.find({creator: params.userId}).populate("creator")
        }
        else {
            return new Response("User ID not specified", {status: 404})
        }

        // return the result in a Response object
        return new Response(JSON.stringify(prompts), {status: 200})

    }catch (error){
        return new Response("Failed to fetch users prompts", {status: 500})
    }
}