import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CamperDtoRepository } from '../db/camper.dto.repository';
import { CamperDto } from '../model-queries/camper.dto';
import { CampersQuery } from './camper.query';

@QueryHandler(CampersQuery)
export class CampersHandler implements IQueryHandler<CampersQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}
  async execute(query: CampersQuery): Promise<CamperDto[]> {
    return this.camperDtoRepository.findAll();
  }
}
