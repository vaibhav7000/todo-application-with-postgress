import { Router, Request, Response, NextFunction } from "express";
import { User } from "../utils/types";
import { client } from "../db/db";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkUserNameExist, validateUserSchema } from "../middlewares/user";

const router = Router();


router.post("/", validateUserSchema, checkUserNameExist, async (req: Request, res: Response, next: NextFunction) => {
    const {username, password }: User = req["body"];
    const query: string = `INSERT INTO users(username, password) VALUES($1, $2);`;
    const values: [string, string] = [username, password];

    // add user to database

    try {
        const response = await client.query(query, values);

        res.status(StatusCodes.CREATED).json({
            msg: ReasonPhrases.CREATED
        })
    } catch (error) {
        next(error);
    }
});




export default router;