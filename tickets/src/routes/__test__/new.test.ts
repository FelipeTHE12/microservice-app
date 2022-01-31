import request from "supertest";
import { app } from "../../app";

it("Has a route handler to listen for post(/api/tickets) requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("only acessible if the user is logged", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(401);
});

it("returns  status other than 401 if user is logged", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(401);
});
