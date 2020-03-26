import { InfectionCount } from './infection-count';

export class Country {
  constructor(public readonly name: string, public readonly infectionCount: InfectionCount[])
  {}
}
