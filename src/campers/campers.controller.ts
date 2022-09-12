import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCamperCommand } from './commands/create-camper/create-camper.commands';
import { UpdateAllergiesCommand } from './commands/update-allergies/update-allergies.command';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { UpdateCamperAllergiesRequest } from './dto/request/update-camper-allergies-requrest.dto';
import { CamperDto } from './model-queries/camper.dto';
import { CampersQuery } from './queries/camper.query';

@Controller('campers')
export class CampersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async getCamper(@Param('id') camperId: string): Promise<void> {}

  @Get()
  async getCampers(): Promise<CamperDto[]> {
    return await this.queryBus.execute<CampersQuery, CamperDto[]>(
      new CampersQuery(),
    );
  }

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateCamperCommand, void>(
      new CreateCamperCommand(createCamperRequest),
    );
  }

  @Patch(':id/allergies')
  async updateCamperAllergies(
    @Param('id') camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest,
  ): Promise<void> {
    this.commandBus.execute<UpdateAllergiesCommand, void>(
      new UpdateAllergiesCommand(
        camperId,
        updateCamperAllergiesRequest.allergies,
      ),
    );
  }
}
