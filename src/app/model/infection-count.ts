export class InfectionCount {
  constructor(public readonly when : Date, public readonly amount : number)
  {}

  public combine(other: InfectionCount) : InfectionCount {
    if(this.when.getTime() !== other.when.getTime())
      throw "not the same period";
    return new InfectionCount(this.when, this.amount + other.amount);
  }
}
