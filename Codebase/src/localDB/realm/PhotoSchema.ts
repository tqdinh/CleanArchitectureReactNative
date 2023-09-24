import 'react-native-get-random-values'
import { createRealmContext } from "@realm/react";
import Realm from "realm";

export class PhotoSchema extends Realm.Object<PhotoSchema> {
  _id!: Realm.BSON.ObjectId;
  photo_path!: string;
  name?: string;
  coordinates?: Realm.List<number>;
  createdAt?: Date = new Date();
  description?: string;

  static schema = {
    name: "Photo",
    properties: {
      _id: "objectId",
      photo_path: "string",
      title: "string?",
      coordinates: "int?[]",
      createdAt: "date?",
      description: "string?",
    },
    primaryKey: "_id",
  };
}

// export const photoContext = createRealmContext({
//   schema: [PhotoSchema],
//   onFirstOpen(realm: Realm) {
//     realm.write(() => {
//       realm.create("Photo", {
//         _id: new Realm.BSON.ObjectID(),
//         photo_path:
//           "https://images.unsplash.com/photo-1607326957431-29d25d2b386f",
//         title: "Photo 1",
//         description:
//           "This is photo 1. Really Long Description - just for demo!",
//         createdAt: new Date(),
//       });

//       realm.create("Photo", {
//         _id: new Realm.BSON.ObjectID(),
//         photo_path:
//           "https://images.unsplash.com/photo-1512238701577-f182d9ef8af7",
//         title: "Photo 2",
//         description:
//           "This is photo 2. Really Long Description - just for demo!",
//         createdAt: new Date(),
//       });
//     });
//   },
// });
