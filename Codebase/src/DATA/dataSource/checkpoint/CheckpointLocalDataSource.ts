import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import { CheckpointDataSource } from "./CheckpointDataSource";
import MMKVStorage from "mmkv/MMKVStorage";
import { JourneyModel } from "models/JourneyModel";
import { useRealm } from "@realm/react";
import { CheckpointModel } from "models/CheckpointModel";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import { CheckpointSchema } from "localDB/realm/CheckpointSchema";
import { JourneySchema } from "localDB/realm/JourneySchema";
import { UpdateMode } from "realm";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";
import { PhotoSchema } from "localDB/realm/PhotoSchema";

export class CheckpointLocalDataSource implements CheckpointDataSource {
  private realm = useRealm();

  private getCurrentJourneyFromLocalStorage(): JourneyModel {
    return MMKVStorage.getCurrentJourney();
  }

  CreateNewCheckpointWithPhotoInCurrentJourney(
    entityCheckpoint: EntityCheckpoint,
    entityPhoto: EntityPhoto,
    entityJourney: EntityJourney
  ) {
    // get journey record from local DB
    if (entityJourney.getId() === undefined) {
      throw new Error("Error: Current Journey is undefined!");
    }
    const currentJourneyRecord = this.realm.objectForPrimaryKey<JourneySchema>(
      "Journey",
      entityJourney.getId()
    );
    if (currentJourneyRecord === null) return;

    // create new Checkpoint

    this.realm.write(() => {
      const newPhotoId = new Realm.BSON.ObjectId();
      const photoRecord = this.realm.create<PhotoSchema>(
        PhotoSchema.schema.name,
        {
          _id: newPhotoId,
          photo_path: entityPhoto.getPhotoPath(),
        }
      );

      const newCheckpointId = new Realm.BSON.ObjectId();
      const checkpointRecord = this.realm.create<CheckpointSchema>(
        CheckpointSchema.schema.name,
        {
          _id: newCheckpointId,
          description: entityCheckpoint.getDescription(),
          starting_time: entityCheckpoint.getStartingTime(),
          photos: [photoRecord],
        }
      );
      // append checkpoint to journey
      currentJourneyRecord.checkpoints.push(checkpointRecord);
      this.realm.create("Journey", currentJourneyRecord, UpdateMode.Modified);
    });
  }
}
