interface TrekkingCheckpoint {
  _id: Realm.BSON.ObjectId;
  journey_id?: Realm.BSON.ObjectId;
  description?: string;
  starting_time?: Date;
  createdAt?: Date;
  photoIds?: string[]
}

export type CheckpointModel = TrekkingCheckpoint | undefined
