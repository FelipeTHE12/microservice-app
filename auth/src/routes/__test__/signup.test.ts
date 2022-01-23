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
