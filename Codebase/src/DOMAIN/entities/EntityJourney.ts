export default class EntityJourney {
  private id: number
  private title: string
  private image_header: string
  private total_subcriber: string
  private date_created: Date

  constructor(
    _id: number,
    _title: string,
    _image_header: string,
    _total_subcriber: string,
    _date_created: Date
  ) {
    this.id = _id
    this.title = _title
    this.image_header = _image_header
    this.total_subcriber = _total_subcriber
    this.date_created = _date_created
  }
}
