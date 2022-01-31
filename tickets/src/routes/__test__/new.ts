import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@12ticketsapp/common";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title")
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 15 })
      .withMessage("Title is required"),
    body("price")
      .not()
      .isEmpty()
      .isFloat({ gt: 0 })
      .withMessage("Price is required"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.send({}).status(200);
  }
);

export { router as createTicketRouter };
