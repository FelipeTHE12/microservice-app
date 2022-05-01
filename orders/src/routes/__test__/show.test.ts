import request from "supertest";
import { app } from "../../app";
import getCookieSignIn from "../../test/getCookieSignIn";
import { Ticket } from "../../models/ticket";

test("Fetches order if exists and belongs to the user", async () => {
  const ticket = Ticket.build({ title: "title", price: 30 });
  await ticket.save();

  const user = getCookieSignIn();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: orderFound } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .expect(200);

  expect(orderFound.id).toEqual(order.id);
});
