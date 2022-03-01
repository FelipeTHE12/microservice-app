import nats from "node-nats-streaming";

console.clear();
//client
const stan = nats.connect("ticketing", "123", {
  url: "http:localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: "123456",
    title: "TICKET tal",
    price: 30,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event published");
  });
});
