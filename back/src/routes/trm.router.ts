import { Router } from "express";
import { getTRMController } from "../controllers/trm.controller";

const router = Router();

router.get("/", getTRMController);

export default router;
