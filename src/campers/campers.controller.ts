import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCamperCommand } from './commands/create-camper.commands';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { UpdateCamperAllergiesRequest } from './dto/request/update-camper-allergies-requrest.dto';

@Controller('campers')
export class CampersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':id')
  async getCamper(@Param('id') camperId: string): Promise<void> {}

  @Get()
  async getCampers(): Promise<void> {}

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateCamperCommand, void>(
      new CreateCamperCommand(createCamperRequest),
    );
  }

  @Patch(':id')
  async updateCamperAllergies(
    @Param('id') camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest,
  ): Promise<void> {}
}