import mongoose from "mongoose";

async function conectNaDataBase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default conectNaDataBase;
