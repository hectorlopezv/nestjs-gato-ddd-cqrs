import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Camper } from '../model/camper';

import { CamperCreatedEvent } from './camper-created.event';

@EventsHandler(Camper)
export class CamperCreatedHandler implements IEventHandler<CamperCreatedEvent> {
  async handle(event: CamperCreatedEvent) {
    //Event on created Camper.
    //Email notification
    const { camperId } = event;
    console.log('CamperCreatedEvent', camperId);
  }
}
