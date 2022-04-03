import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();
//client
const stan = nats.connect("ticketing", "123", {
  url: "http:localhost:4222",
});

stan.on("connect", async () => {
  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: "1",
      title: "Curso grs",
      price: 300,
    });
  } catch (err) {
    console.error(err);
  }
});
