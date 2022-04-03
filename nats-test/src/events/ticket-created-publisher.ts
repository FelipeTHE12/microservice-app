import { Publisher } from "./base-publisher";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subsjects } from "./subjects-enum";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subsjects.TicketCreated = Subsjects.TicketCreated;
}
