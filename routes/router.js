import { Router } from "express"
import chat from "./chat.router.js";

const router = Router()

router.use("/chat", chat)


export default router