import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();
///client ID
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http:localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to nats");

  stan.on("close", () => {
    console.log("Nats connection closed");
    process.exit();
  });
  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subscription = stan.subscribe(
    "ticket:created",
    "listenerQueueGroupTicket",
    options
  );

  subscription.on("message", (msg: Message) => {
    console.log("Message received");
    const data = msg.getData();

    typeof data === "string" && console.log(data);

    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
