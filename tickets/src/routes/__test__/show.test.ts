import Mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import getCookieSignIn from "../../test/getCookieSignIn";

describe("Show Ticket", () => {
  test("returns a 404 if the ticket is not found", async () => {
    const id = new Mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  test("returns a 200 if the ticket is found", async () => {
    const cookie = getCookieSignIn();
    const title = "abcde";
    const price = 30;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({ title, price })
      .expect(201);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
  });
});
