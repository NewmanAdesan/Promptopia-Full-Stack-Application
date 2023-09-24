/* we will use this to connect/hook to our database */

import mongoose from 'mongoose';


// track the connection status
let isConnected = false;  


export const connectToDB = async ()=> {
    mongoose.set("strictQuery", true);

    // are we currently connected?
    /* 
        remember nextJS routing is serverless, there is no permanent connection
        functions get called only when needed.
    */
    if (isConnected) {
        console.log("mongoDB is already connectd");
        return;
    }

    try {

        // connect to your mongoDB database
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewURLParser: true,
            useUnifiedTopology: true
        })

        // update connection status tracker
        isConnected = true;
        


    } catch (error) {
        console.log(error);
    }


}