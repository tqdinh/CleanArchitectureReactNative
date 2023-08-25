export default class EntityPhoto {
  // private id: number
  private checkpoint_id: number
  private photo_url: string
  private name: string
  private coordinates: [number, number]
  private date_created: number

  constructor(
    // _id: number,
    _checkpoint_id: number,
    _photo_url: string,
    _name: string,
    _coordinates: [number, number],
    _date_created: number
  ) {
    // this.id = _id
    this.checkpoint_id = _checkpoint_id
    this.photo_url = _photo_url
    this.name = _name
    this.coordinates = _coordinates
    this.date_created = _date_created
  }
}
