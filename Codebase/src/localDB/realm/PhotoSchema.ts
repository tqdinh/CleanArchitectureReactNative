import Realm from "realm";

export class PhotoSchema extends Realm.Object<PhotoSchema> {
  _id!: Realm.BSON.ObjectId;
  photo_path!: string;
  name?: string;
  coordinates?: Realm.List<number>;
  createdAt?: Date = new Date();

  static schema = {
    name: "Photo",
    properties: {
      _id: 'objectId',
      title: "string",
      description: "string?",
      journey_time: "int?",
      coordinates: "int?[]",
      createdAt: "date?",
    },
    primaryKey: "_id",
  };
}
