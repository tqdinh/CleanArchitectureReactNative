import { PhotoFile } from "react-native-vision-camera";

class PhotoModel {
  // private id: number
  private checkpoint_id: number;
  private photo: PhotoFile;
  private name: string;
  private coordinates: [number, number];
  private date_created: number;

  constructor(
    // _id: number,
    _checkpoint_id: number,
    _photo: PhotoFile,
    _name: string,
    _coordinates: [number, number],
    _date_created: number
  ) {
    // this.id = _id
    this.checkpoint_id = _checkpoint_id;
    this.photo = _photo;
    this.name = _name;
    this.coordinates = _coordinates;
    this.date_created = _date_created;
  }
}
