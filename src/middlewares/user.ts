import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../utils/types";
import { UserSchema } from "../utils/zodTypes";
import { Request, Response, NextFunction} from "express";
import { client } from "../db/db";


function validateUserSchema(req: Request, res: Response, next: NextFunction): void{
    const user: User = req["body"];

    const result = UserSchema.safeParse(user);

    if(!result.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            msg: ReasonPhrases.BAD_REQUEST
        })
        return
    }

    req["body"] = result.data;

    next();
}


async function checkUserNameExist(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username }: User = req["body"];
    const query: string = `SELECT username FROM users WHERE username = $1`;
    const value: [string] = [username];

    try {
        const result = await client.query(query, value);

        if(result.rows.length) {
            console.log("username already exists");
            res.status(StatusCodes.CONFLICT).json({
                msg: ReasonPhrases.CONFLICT
            })
            return
        }

        next();
    } catch (error) {
        next(error);
    }


}

export {
    validateUserSchema, checkUserNameExist
}