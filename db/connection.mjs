import mongoose from "mongoose";

export const connect = async (uri) => {
    try {
        await mongoose.connect(uri) 

        console.log("database connected successfully")
    }
    catch(err) {
        console.log("error: ", err.message);
    }
}