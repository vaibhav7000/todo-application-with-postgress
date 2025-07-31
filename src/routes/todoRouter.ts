import { NextFunction, Router, Request, Response } from "express";
import { Todo, User_Id } from "../utils/types";
import { client } from "../db/db";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const router = Router();

router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
    const {title, description, completed, user_id}: Todo = req["body"];
    const query: string = `INSERT INTO todos(title, description, completed, user_id) VALUES($1, $2, $3, $4);`;
    const values: (string | number)[] = [title, description, completed, user_id];

    try {
        const result = await client.query(query, values);
        console.log(result);
        res.status(StatusCodes.OK).json({
            msg: ReasonPhrases.OK
        })
    } catch (error) {
        next(error);
    }
});

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    const {user_id}: {user_id: number} = req.body;

    const query: string = `SELECT * FROM todos WHERE user_id = $1;`;
    const values: [number] = [user_id];

    try {
        const result = await client.query(query, values);

        res.status(StatusCodes.OK).json({
            msg: ReasonPhrases.OK,
            all: result["rows"],
        })
        
    } catch (error) {
        next(error);
    }
})

export default router;