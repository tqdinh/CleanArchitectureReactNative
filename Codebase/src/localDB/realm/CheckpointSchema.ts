import Realm from "realm";
import { PhotoSchema } from "./PhotoSchema";

export class CheckpointSchema extends Realm.Object<CheckpointSchema> {
  _id!: Realm.BSON.ObjectId;
  description?: string;
  starting_time?: Date;
  createdAt?: Date = new Date();

  photos!: Realm.List<PhotoSchema>;

  static schema = {
    name: "Checkpoint",
    properties: {
      _id: 'objectId',
      description: "string?",
      starting_time: "date?",
      createdAt: "date?",
      photos: 'Photo[]'
    },
    primaryKey: "_id",
  };
}
