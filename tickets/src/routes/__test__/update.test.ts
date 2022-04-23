import request from "supertest";
import { app } from "../../app";
import Mongoose from "mongoose";
import getCookieSignIn from "../../test/getCookieSignIn";
import { natsWrapper } from "../../nats-wrapper";

describe("Update Ticket", () => {
  test("returns a 404 if the provided id does not exist", async () => {
    const cookie = getCookieSignIn();
    const id = new Mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", cookie)
      .send({
        title: "abdafdsfasdc",
        price: 20,
      })
      .expect(404);
  });

  test("returns a 401 if user is not authenticated", async () => {
    const cookie = getCookieSignIn();
    const id = new Mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: "abdafdsfasdc",
        price: 20,
      })
      .expect(401);
  });

  test("returns a 401 if the user does not own the ticket", async () => {
    const cookie = getCookieSignIn();
    const title = "abcde";
    const price = 30;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({ title, price })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", getCookieSignIn())
      .send({
        title: "abdafdsfasdc",
        price: 500,
      })
      .expect(401);
  });

  test("returns a 400 if the user gives invalid title or price", async () => {
    const cookie = getCookieSignIn();
    const title = "abcde";
    const price = 30;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({ title, price })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title:
          "DSAIUHDIASHDIHASIODHIOHASDIOHASIOHDSAIHDIOSAHDIAHSIHDASIHDIHASDIHASIHDIAHSDIOHASDHASIODHASIHDIOHDSIOHASDIOHASIHDASIHDAISHIO",
        price: -10,
      })
      .expect(400);
  });

  test("update ticket if the user gives valid title and price and also own the ticket", async () => {
    const cookie = getCookieSignIn();
    const title = "abcde";
    const price = 30;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({ title, price })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "update title",
        price: 100,
      })
      .expect(200);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();
    expect(ticketResponse.body.title).toEqual("update title");
    expect(ticketResponse.body.price).toEqual(100);
  });
});

test("Should publish an updated event", async () => {
  const cookie = getCookieSignIn();
  const title = "abcde";
  const price = 30;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "update title",
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();
  expect(ticketResponse.body.title).toEqual("update title");
  expect(ticketResponse.body.price).toEqual(100);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
