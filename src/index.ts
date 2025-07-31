import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import connectionWithPG from "./db/db";
import allRoutes from "./routes/allRouters";



const app = express();

(async () => {

    try {
        await connectionWithPG();

        app.listen(process.env.PORT, function() {
            console.log("backend is up");
        })
    } catch(error) {
        console.log("shutting down the backend");
        console.log(error);
        process.exit();
    }

})();


app.use(express.json());

app.use("/api/v1", allRoutes);



// global catch middleware
app.use(function(err: Error, req: Request, res: Response, next: NextFunction): void {
    if(err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: ReasonPhrases.INTERNAL_SERVER_ERROR
        })
        return;
    }

    next();
})


// route not found middleware
app.use(function(req: Request, res: Response, next: NextFunction): void {
    res.status(StatusCodes.NOT_FOUND).json({
        msg: ReasonPhrases.NOT_FOUND
    })
})

