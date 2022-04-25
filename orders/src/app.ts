import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler } from "@12ticketsapp/common";
import { deleteOrderRouter } from "./routes/__test__/delete";
import { listOrderRouter } from "./routes/__test__/list";
import { showOrderRouter } from "./routes/__test__/show";
import { newOrderRouter } from "./routes/__test__/new";

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
app.use(errorHandler);

//Routes
app.use(deleteOrderRouter);
app.use(listOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);

export { app };
