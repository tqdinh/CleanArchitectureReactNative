import Realm from "realm";
import { PhotoSchema } from "./PhotoSchema";

export class CheckpointSchema extends Realm.Object<CheckpointSchema> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description?: string;
  journey_time?: number;
  createdAt?: Date = new Date();

  // photos?: Realm.List<PhotoSchema>;

  static schema = {
    name: "Checkpoint",
    properties: {
      _id: 'objectId',
      title: "string",
      description: "string?",
      journey_time: "int?",
      createdAt: "date?",
      // photos: 'Photo?[]'
    },
    primaryKey: "_id",
  };
}
