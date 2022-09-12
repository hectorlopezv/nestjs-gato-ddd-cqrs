import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CamperFactory } from '../factories/camper.factory';

import { CreateCamperCommand } from './create-camper.commands';

@CommandHandler(CreateCamperCommand)
export class CreateCamperHandler
  implements ICommandHandler<CreateCamperCommand>
{
  constructor(
    private readonly camperFactory: CamperFactory,
    private readonly enventPublisher: EventPublisher,
  ) {}
  async execute(command: CreateCamperCommand): Promise<void> {
    const { createCampeRequest } = command;
    const { name, age, allergies } = createCampeRequest;
    const camper = this.enventPublisher.mergeObjectContext(
      await this.camperFactory.create(name, age, allergies),
    );
    // save all events we made
    camper.commit();
  }
}
