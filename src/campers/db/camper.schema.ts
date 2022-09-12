import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity.schema';

Schema({ versionKey: false, collection: 'campers' });
export class CamperSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly name: string;
  @Prop()
  readonly age: number;
  @Prop()
  readonly allergies: string[];
}
