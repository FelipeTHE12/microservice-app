import request from "supertest";
import { app } from "../../app";
import Mongoose from "mongoose";
import getCookieSignIn from "../../test/getCookieSignIn";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({ title: "titulo ticket etst", price: 30 });
  await ticket.save();

  return ticket;
};

test("Fetch all orders that belongs to the user", async () => {
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const userOne = getCookieSignIn();
  const userTwo = getCookieSignIn();

  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticket1.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: orderThree } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticket3.id })
    .expect(201);

  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);

  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderTwo.id);
  expect(response.body[1].id).toEqual(orderThree.id);
});
