import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { CampersController } from './campers.controller';
import { CamperCommandHandlers } from './commands';
import { CamperDtoRepository } from './db/camper.dto.repository';

import { CamperSchema } from './db/camper.schema';
import { CamperSchemaFactory } from './db/factory/camper-schema.factory';
import { CamperEntityRepository } from './db/repository/camper.entity.repository';
import { CampersEventHandlers } from './events';
import { CamperFactory } from './factories/camper.factory';
import { CamperQueyHandlers } from './queries';

@Module({
  controllers: [CampersController],
  providers: [
    CamperSchemaFactory,
    CamperEntityRepository,
    CamperFactory,
    CamperDtoRepository,
    ...CamperCommandHandlers,
    ...CampersEventHandlers,
    ...CamperQueyHandlers,
  ],
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: CamperSchema.name,
        schema: SchemaFactory.createForClass(CamperSchema),
      },
    ]),
  ],
})
export class CampersModule {}
