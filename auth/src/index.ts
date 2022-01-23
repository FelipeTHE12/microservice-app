import { connect } from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT não definido");
  }
  try {
    await connect("mongodb://auth-mongo-srv:27017/auth");
  } catch (err) {
    console.log(err);
  }

  console.log("i guess it works");
};

app.listen(3000, () => {
  console.log("Testando atualziacao imagem");
  console.log("Porta 3000 ON");
});

start();
