import { connect } from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT não definido");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("URI MONGO não definido");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID não definido");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL não definido");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID não definido");
  }

  try {
    await connect(process.env.MONGO_URI);

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("Finishing nats connection");
      process.exit();
    });

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
  } catch (err) {
    console.log(err);
    console.log("Entrou no errors");
  }

  console.log("i guess it works");
};

app.listen(3000, () => {
  console.log("Testando atualziacao imagem");
  console.log("Porta 3000 ON");
});

start();
