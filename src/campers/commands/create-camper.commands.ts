import { CreateCamperRequest } from '../dto/request/create-camper-request.dto';

export class CreateCamperCommand {
  constructor(public readonly createCampeRequest: CreateCamperRequest) {}
}
