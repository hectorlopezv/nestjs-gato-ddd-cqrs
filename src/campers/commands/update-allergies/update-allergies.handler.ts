import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CamperEntityRepository } from 'src/campers/db/repository/camper.entity.repository';
import { UpdateAllergiesCommand } from './update-allergies.command';

@CommandHandler(UpdateAllergiesCommand)
export class UpdateAllergiesHandler
  implements ICommandHandler<UpdateAllergiesCommand>
{
  constructor(
    private readonly camperEntityRepository: CamperEntityRepository,
    private readonly enventPublisher: EventPublisher,
  ) {}
  async execute(command: UpdateAllergiesCommand): Promise<void> {
    const { allergies, camperId } = command;
    const camper = this.enventPublisher.mergeObjectContext(
      await this.camperEntityRepository.findOneById(camperId),
    );

    camper.updateAllergies(allergies);
    await this.camperEntityRepository.findOneAndReplaceById(camperId, camper);

    camper.commit();
  }
}
