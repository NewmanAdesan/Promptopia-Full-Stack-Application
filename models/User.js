
import {Schema, model, models} from 'mongoose';


// create a schema for this document/model
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exist"],
        required: [true, "username is required"],
    },

    username: {
        type: String,
        required: [true, "username is required"],
        match: [/(?=.{8,20}$)(?!.*[_.]{2})(?!.*[_.]$)(?![._])^[a-zA-Z0-9._]/, "username invalid, it must contain 8-20 alphanumeric letters, it must not have two consecutive undescores or periods, must not begin/end with an underscore or period, must only contain characters such as a-z,A-Z,0-9,.,_"],
        unique: [true, "Email already exist"],
    },

    image: {
        type: String,
    }

    // we make use of the positive lookahead, negative lookahead, negative lookbehind concepts of regex
    // (?=.{8,20}$) - must contain 8-20 alphanumeric letters
    // (?!.*[_.]{2}) - must not have two consecutive undescores or periods
    // (?!.*[_.]$) - must not end with an underscore or period
    // (?![._]) - must not begin with an underscore or period
    // ^[a-zA-Z0-9._]$ - characters must be in this range
})




/**
 * usally if you are working with something like express, 
 * you would write this to create a model
 *          const User = model("User", UserSchema);
 * 
 * we would do this if we were working with an always on, always running backend server. 
 * but in NextJS, its a bit different, 
 * we said the route will only be created & running for the time when it is getting called.
 * therefore, we need to be sure there is no model called User already.
 * 
 * 
 * the models object is provided by the mongoose library and stores all the registered models.
 * 
 * if a model named "User" already exists in the models object, 
 * it assigns that existing model to the "User" variable.
 * this prevents redefining the model and ensures that the existing model is reused.
 * 
 * if a model named "User" does not exist in the "models" object,
 * the "model" function from mongoose is called to ccreate a new model.
 * the newly created model is assigned to the "User" variable
 */

const User = models.User || model("User", UserSchema);
export default User;