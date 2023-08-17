export default class EntityCheckpoint {
  private id: number
  private journey_id: number
  private description: string
  private starting_time: Date
  private date_created: Date

  constructor(
    _id: number,
    _journey_id: number,
    _description: string,
    _starting_time: Date,
    _date_created: Date
  ) {
    this.id = _id
    this.journey_id = _journey_id
    this.description = _description
    this.starting_time = _starting_time
    this.date_created = _date_created
  }
}
