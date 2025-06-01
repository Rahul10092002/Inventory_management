import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedConn: mongoose.Mongoose | null = null;
let isConnecting = false;
const connectionPromise: Promise<mongoose.Mongoose> | null = null;

async function dbConnect() {
  if (cachedConn) {
    return cachedConn;
  }

  if (isConnecting) {
    return connectionPromise!;
  }

  isConnecting = true;

  const opts = {
    bufferCommands: false,
  };

  const promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    cachedConn = mongoose;
    return mongoose;
  });

  return promise;
}

export default dbConnect;
