import * as z from "zod";
import { User } from "./types";

const UserSchema = z.object({
    username: z.string().max(50, {
        error: "username exceeds 50 length",
    }),
    password: z.string().min(8, {
        error: "Password is too short"
    }).max(50, {
        error: "Password is too long"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/, {
        error: "Password does not fullfils the requirement"
    })
});

const TodoSchema = z.object({
    title: z.string().max(50, {
        error: "Title is too long",
    }),
    description: z.string().max(255, {
        error: "Description is too long"
    }),
    completed: z.boolean({
        error: "Require a boolean value"
    })
})


export {
    UserSchema,
    TodoSchema
}