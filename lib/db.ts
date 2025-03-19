import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please add MONGODB_URI in .env file")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

export async function connectToDatabase() {
    if (cached.conn) return cached.conn
    
    if (!cached.promise) { 

        const opts = {
            bufferCommands: true, // stored tasks in a queue until the db gets connected
            maxPoolSize: 10 //maximum conn to have in mongodb
        }
        cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error: any) {
        cached.promise = null
        console.error("Error in connectToDatabase ./lib/db.ts", error.message)
    }

    return cached.conn;
    
}

// add disconnect function