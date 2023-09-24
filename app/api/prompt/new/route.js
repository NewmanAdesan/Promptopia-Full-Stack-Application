import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";


// route handler for post request
export const POST = async (req) => {

    // extract prompt information
    const { userId, prompt, tag }  = await req.json();

    try {
        // connect to database
        await connectToDB();

        // create a record for prompt in the Prompt Schema
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201})

    } catch (error) {
        return new Response("Failed to Create A New Prompt", { status: 500})
    }
}



