import request from "supertest";
import { app } from "../../app";

it("Returns a 201 on successful signup", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido@teste.com",
      password: "123456",
    })
    .expect(201);
});

it("Returns a 400 on invalid email", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido.com",
      password: "123456",
    })
    .expect(400);
});

it("Returns a 400 on invalid password", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido@teste.com",
      password: "12",
    })
    .expect(400);
});

it("Returns a 400 on empty object/fields", async () => {
  await request(app).post("/api/users/signup").send({}).expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido@teste.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "12345",
    })
    .expect(400);
});

it("Doenst let duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido@teste.com",
      password: "123456",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido@teste.com",
      password: "123456",
    })
    .expect(400);
});

it("sets a cookie after sign up", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido@teste.com",
      password: "123456",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
