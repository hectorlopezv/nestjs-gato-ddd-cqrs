import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CamperCreatedEvent } from './camper-created.event';

@EventsHandler(CamperCreatedEvent)
export class CamperCreatedHandler implements IEventHandler<CamperCreatedEvent> {
  async handle(event: CamperCreatedEvent): Promise<void> {
    //Event on created Camper.
    //Email notification
    const { camperId } = event;
    console.log('CamperCreatedEvent', camperId);
  }
}
