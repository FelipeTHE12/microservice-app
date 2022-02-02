import request from "supertest";
import { app } from "../../app";
import getCookieSignIn from "../../test/getCookieSignIn";

it("Has a route handler to listen for post(/api/tickets) requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("only acessible if the user is logged", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(401);
});

it("returns status other than 401 if user is logged", async () => {
  const cookie = getCookieSignIn();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  const cookie = getCookieSignIn();
  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "", price: 300 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "", price: 300 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "123456789101234567891012345678910", price: 300 })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  const cookie = getCookieSignIn();

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "asdufihasidu", price: "" })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "", price: -1 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "asdufihasidu" })
    .expect(400);
});

it("creates a ticket with success when valid inputs", async () => {
  const cookie = getCookieSignIn();

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "asdufihasidu", price: "" })
    .expect(201);
});
