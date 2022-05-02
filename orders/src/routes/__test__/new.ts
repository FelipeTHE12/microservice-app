import express, { Request, Response } from "express";
import { OrderStatus, requireAuth, validateRequest } from "@sgtickets/common";
import { body } from "express-validator";
import mongoose, { mongo } from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { BadRequestError, NotFoundError } from "@12ticketsapp/common";
import { OrderCreatedPublisher } from "../../events/publishers/order-created-publisher";
import { natsWrapper } from "../../nats-wrapper";

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

    const ticketIsReserved = await ticket.isReserved();

    if (ticketIsReserved) {
      throw new BadRequestError("Ticket já está em uso");
    }

    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 15 * 60);

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expirationDate,
      ticket,
    });

    await order.save();

    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
      version: 1,
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
