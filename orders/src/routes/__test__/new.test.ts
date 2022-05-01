import request from "supertest";
import { app } from "../../app";
import Mongoose from "mongoose";
import getCookieSignIn from "../../test/getCookieSignIn";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

test("Return error if the ticket !EXIST", async () => {
  const ticketId = new Mongoose.Types.ObjectId().toHexString();
  const cookie = getCookieSignIn();
  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId })
    .expect(404);
});

test("Return error if the ticket IS RESERVED", async () => {
  const ticket = Ticket.build({ title: "titulo ticket etst", price: 30 });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "random",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();
  const cookie = getCookieSignIn();
  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(400);
});

test("RESERVS a ticket with success", async () => {
  const ticket = Ticket.build({ title: "titulo ticket etst", price: 30 });
  await ticket.save();
  const cookie = getCookieSignIn();
  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);
});
