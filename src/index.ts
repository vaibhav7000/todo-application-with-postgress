import dotenv from "dotenv";
dotenv.config();
import Express from "express";
import connectionWithPG from "./db/db";



const application = Express();

(async () => {

    try {
        await connectionWithPG();

        application.listen(process.env.PORT, function() {
            console.log("backend is up");
        })
    } catch(error) {
        console.log("shutting down the backend");
        console.log(error);
        process.exit();
    }

})()

