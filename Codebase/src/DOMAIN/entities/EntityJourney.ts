export default class EntityJourney {
  private title: string
  private image_header: string
  private total_subcriber: number
  private date_created: number

  constructor(
    _title: string,
    _image_header: string,
    _total_subcriber: number,
    _date_created: number
  ) {
    this.title = _title
    this.image_header = _image_header
    this.total_subcriber = _total_subcriber
    this.date_created = _date_created
  }

  getTitle = () => {
    return this.title
  }

  getImageHeader = () => {
    return this.image_header
  }

  getTotalSubcriber = () => {
    return this.total_subcriber
  }

  getDateCreated = () => {
    return this.date_created
  }
}
