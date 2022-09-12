import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Camper extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly age: number,
    private allergies: string[],
  ) {
    super();
  }

  getId() {
    return this._id;
  }
  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
  getAllergies() {
    return [...this.allergies];
  }

  updateAllergies(allergies: string[]) {
    const allergiesLower = allergies.map((allergy) => allergy.toLowerCase());
    if (allergiesLower.includes('chocolate')) {
      throw new BadRequestException('allergh may not be chocolate');
    }

    this.allergies = allergies;
  }
}
