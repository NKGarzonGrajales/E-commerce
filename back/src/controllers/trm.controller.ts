import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { getTRM } from "../services/trm.service";

export const getTRMController = catchedController(
  async (req: Request, res: Response) => {
    const trm = await getTRM();
    res.json({ trm });
  }
);