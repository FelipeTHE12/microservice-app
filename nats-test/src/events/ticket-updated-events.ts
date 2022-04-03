import { Subsjects } from "./subjects-enum";

export interface TicketUpdatedEvent {
  subject: Subsjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
