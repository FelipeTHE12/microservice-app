import { Message, Stan } from "node-nats-streaming";
import { Subsjects } from "./subjects-enum";

interface Event {
  subject: Subsjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queuGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;
  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queuGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queuGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Messagem recebida: ${this.subject} - ${this.queuGroupName}`);

      const parsedMessage = this.parseMessage(msg);
      this.onMessage(parsedMessage, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
