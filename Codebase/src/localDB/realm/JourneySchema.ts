import 'react-native-get-random-values'
import { JourneyStatus } from "../../models/JourneyModel";
import Realm from "realm";
import { CheckpointSchema } from "./CheckpointSchema";

export class JourneySchema extends Realm.Object<JourneySchema> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  image_header?: string;
  total_subcriber?: number;
  createdAt: Date = new Date();
  status?: JourneyStatus;

  checkpoints!: Realm.List<CheckpointSchema>;

  static schema = {
    name: "Journey",
    properties: {
      _id: 'objectId',
      title: "string",
      image_header: "string?",
      total_subcriber: "int?",
      createdAt: "date",
      status: "string?",
      checkpoints: 'Checkpoint[]'
    },
    primaryKey: "_id",
  };
}
