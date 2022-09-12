import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Camper } from '../../model/camper';

import { CamperSchemaFactory } from '../factory/camper-schema.factory';
import { CamperSchema } from '../camper.schema';
import { BaseEntityRepository } from '../../..//database/base-entity.repository';

@Injectable()
export class CamperEntityRepository extends BaseEntityRepository<
  CamperSchema,
  Camper
> {
  constructor(
    @InjectModel(CamperSchema.name) camperModel: Model<CamperSchema>,
    camperSchemaFactory: CamperSchemaFactory,
  ) {
    super(camperModel, camperSchemaFactory);
  }
}
