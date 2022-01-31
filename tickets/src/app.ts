import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
  requireAuth,
} from "@12ticketsapp/common";
import { createTicketRouter } from "./routes/__test__/new";

const app = express();

app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

//Routes
app.use(createTicketRouter);

app.use(errorHandler);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
export { app };
