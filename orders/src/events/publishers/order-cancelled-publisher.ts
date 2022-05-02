import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
  OrderCancelledEvent,
} from "@sgtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
