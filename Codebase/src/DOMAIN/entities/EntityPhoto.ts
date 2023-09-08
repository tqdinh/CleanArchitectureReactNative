export default class EntityPhoto {
  private photo_path: string;
  private checkpoint_id?: number;
  private name?: string;
  private createdAt?: Date;
  private description?: string;

  constructor(
    _photo_path: string,
    _checkpoint_id?: number,
    _name?: string,
    _description?: string,
    _createdAt?: Date
  ) {
    this.checkpoint_id = _checkpoint_id;
    this.photo_path = _photo_path;
    this.name = _name;
    this.createdAt = _createdAt;
    this.description = _description;
  }

  public getPhotoPath() {
    return this.photo_path;
  }
  public getName() {
    if (this.name === "" || this.name === undefined) return "Photo Name";
    return this.name;
  }
  public getDescription() {
    if (this.description === undefined) return "Photo Description";
    return this.description;
  }
}
