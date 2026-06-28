import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
    .then(() => {
        app.get("/", (req, res) => {
            res.send("App is running....");
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`App is running on the port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Momgo DB connection failed!!! ", err)
    })

