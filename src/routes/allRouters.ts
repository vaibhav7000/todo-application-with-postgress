import { Router } from "express";
import userRouter  from "./userRouter";
import todoRouter from "./todoRouter";

const router = Router();

router.use("/user", userRouter);

router.use("/todo", todoRouter);


export default router;