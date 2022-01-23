import request from "supertest";
import { app } from "../../app";

it("Return status code 400 when given email that doenst exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "emailvalido@teste.com",
      password: "123456",
    })
    .expect(400);
});

it("Return status code 400 when given incorrect password", async () => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido@teste.com",
      password: "123456",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "emailvalido@teste.com",
      password: "12345",
    })
    .expect(400);
});

it("sets a cookie after sign in", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido@teste.com",
      password: "123456",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "emailvalido@teste.com",
      password: "123456",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
