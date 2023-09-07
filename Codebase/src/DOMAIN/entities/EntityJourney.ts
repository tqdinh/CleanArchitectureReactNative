export default class EntityJourney {
  private title?: string
  private image_header?: string
  private total_subcriber?: number
  private createdAt?: Date

  constructor(
    _title?: string,
    _image_header?: string,
    _total_subcriber?: number,
    _createdAt?: Date
  ) {
    this.title = _title
    this.image_header = _image_header
    this.total_subcriber = _total_subcriber
    this.createdAt = _createdAt
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
    return this.createdAt
  }
}
