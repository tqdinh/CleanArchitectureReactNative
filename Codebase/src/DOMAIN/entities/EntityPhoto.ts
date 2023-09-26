import { Location } from "@rnmapbox/maps";

export default class EntityPhoto {
  private photo_path: string;
  private checkpoint_id?: number;
  private name?: string;
  private createdAtTimestamp?: number;
  private description?: string;
  private location?: Location;

  constructor(
    _photo_path: string,
    _checkpoint_id?: number,
    _name?: string,
    _description?: string,
    _createdAtTimestamp?: number,
    _location?: Location
  ) {
    this.checkpoint_id = _checkpoint_id;
    this.photo_path = _photo_path;
    this.name = _name;
    this.createdAtTimestamp = _createdAtTimestamp;
    this.description = _description;
    this.location = _location;
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

  public getLocation() {
    return this.location;
  }
}
