import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntityFactory } from 'src/database/entity.factory';
import { CamperEntityRepository } from '../db/repository/camper.entity.repository';
import { Camper } from '../model/camper';

@Injectable()
export class CamperFactory implements EntityFactory<Camper> {
  constructor(
    private readonly camperEntityRepository: CamperEntityRepository,
  ) {}
  async create(
    name: string,
    age: number,
    allergies: string[],
  ): Promise<Camper> {
    const camper = new Camper(
      new ObjectId().toHexString(),
      name,
      age,
      allergies,
    );
    await this.camperEntityRepository.create(camper);

    return camper;
  }
}
