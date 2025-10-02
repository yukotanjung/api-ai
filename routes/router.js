import { Router } from "express"
import gen from "./gen.router.js";

const router = Router()

router.use("/chat", gen)


export default router