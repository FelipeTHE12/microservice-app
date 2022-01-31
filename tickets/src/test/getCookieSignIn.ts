import request from "supertest";
import { app } from "../app";

export const getCookieSignIn = async () => {
  const email = "emailvalido@teste.com";
  const password = "123456";

  const response = await request(app).post("/api/users/signup").send({
    email,
    password,
  });

  const cookie = response.get("Set-cookie");

  return cookie;
};
