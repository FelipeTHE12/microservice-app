import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler } from "@12ticketsapp/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { listTicketRouter } from "./routes/list";

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
app.use(showTicketRouter);
app.use(listTicketRouter);

app.use(errorHandler);

export { app };
