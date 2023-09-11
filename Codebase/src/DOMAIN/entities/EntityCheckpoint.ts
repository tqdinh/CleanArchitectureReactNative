export default class EntityCheckpoint {
  private journey_id?: number;
  private description?: string;
  private starting_time?: Date;
  private createdAt?: Date;

  constructor(
    _journey_id?: number,
    _description?: string,
    _starting_time?: Date,
    _createdAt?: Date
  ) {
    this.journey_id = _journey_id;
    this.description = _description;
    this.starting_time = _starting_time;
    this.createdAt = _createdAt;
  }

  public getJourneyId() {
    return this.journey_id;
  }

  public getDescription() {
    return this.description;
  }

  public getStartingTime() {
    return this.starting_time;
  }

  public getCreatedAt() {
    return this.createdAt;
  }
}
