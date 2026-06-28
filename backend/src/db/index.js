import mongoose from "mongoose"

const connectDB = async () => {
    try{
        const dataBase_Connect = await mongoose.connect(`${process.env.MONGO_DB}/cineVerse`);
        console.log(`DataBase connected to port: ${dataBase_Connect.connection.port} port`)
    }
    catch(err){
        console.log("Error while connecting to DataBase", err);
    }
}
export default connectDB