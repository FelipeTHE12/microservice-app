import { Subsjects } from "./subjects-enum";

export interface TicketCreatedEvent {
  readonly subject: Subsjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
