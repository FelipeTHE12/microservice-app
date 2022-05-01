import request from "supertest";
import { app } from "../../app";
import getCookieSignIn from "../../test/getCookieSignIn";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

test("Charge order status to cancelled", async () => {
  const ticket = Ticket.build({ title: "title", price: 30 });
  await ticket.save();

  const user = getCookieSignIn();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
