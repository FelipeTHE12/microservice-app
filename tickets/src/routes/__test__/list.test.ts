import request from "supertest";
import { app } from "../../app";
import getCookieSignIn from "../../test/getCookieSignIn";

const createTicket = () => {
  const cookie = getCookieSignIn();
  return request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "abcdeee", price: 123 })
    .expect(201);
};

describe("Ticket Listing", () => {
  test("returns a list of tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app).get("/api/tickets").send().expect(200);

    expect(response.body.length).toEqual(6);
  });
});
