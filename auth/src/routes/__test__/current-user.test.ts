import request from "supertest";
import { app } from "../../app";
import { getCookieSignIn } from "../../test/getCookieSignIn";

it("responds with jwt and user info after signin", async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "emailvalido@teste.com",
      password: "123456",
    })
    .expect(201);
  const cookie = authResponse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("emailvalido@teste.com");
});

it("responds with 401 if user is not logged in", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(401);
  console.log(response.body);
});
