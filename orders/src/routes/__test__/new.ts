import express, { Request, Response } from "express";
import { OrderStatus, requireAuth, validateRequest } from "@sgtickets/common";
import { body } from "express-validator";
import mongoose, { mongo } from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { BadRequestError, NotFoundError } from "@12ticketsapp/common";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId é obrigtório"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    const existingFoundOrder = await Order.findOne({
      ticket: ticket,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
        ],
      },
    });

    if (existingFoundOrder) {
      throw new BadRequestError("Ticket já está em uso");
    }

    res.send({});
  }
);

export { router as newOrderRouter };
