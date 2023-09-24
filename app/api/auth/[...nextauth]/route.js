


// within here, we can set up our providers such as google authentication & callbacks i.e functions that would be called when user signs in or when user session begins in the case we want special things to happen.


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";  
import {connectToDB} from '@utils/database';
import { connect } from "mongoose";
import User from '@models/User';


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async session ({session}){
            // we want to know the data in the database that corresponds to the current session user.
            // since every user in the database has an "id", we would add this id to the session object.
            const sessionUser = await User.findOne({email: session.user.email});
            session.user.id = sessionUser._id.toString();
            return session; 

        },

        async signIn ({profile}){

            try{
                // make connection to database
                await connectToDB();

                // is user in database?
                const userExists = await User.findOne({email: profile.email})

                // if user is not in database, add user to database
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                // return true
                return true;

            } catch (error) {
                console.log(error);
            }

        }
    }
});

export {handler as GET, handler as POST};

// for next authentication this is how we do it, how it is explained in the official documentation

// first to be able to get the user session, we have to sign in the user.