import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subsjects } from "./subjects-enum";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subsjects.TicketCreated = Subsjects.TicketCreated;
  queuGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data", data);
    msg.ack();
  }
}
