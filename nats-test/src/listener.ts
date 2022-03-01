import nats, { Message } from "node-nats-streaming";
import { type } from "os";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http:localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to nats");

  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", (msg: Message) => {
    console.log("Message received");
    const data = msg.getData();

    typeof data === "string" && console.log(data);
  });
});
