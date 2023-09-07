import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import { CheckpointDataSource } from "./CheckpointDataSource";
import MMKVStorage from "mmkv/MMKVStorage";
import { JourneyModel } from "models/JourneyModel";
import { useRealm } from "@realm/react";
import { CheckpointModel } from "models/CheckpointModel";

export class CheckpointLocalDataSource implements CheckpointDataSource {
  private realm = useRealm();

  private getCurrentJourneyFromLocalStorage(): JourneyModel {
    return MMKVStorage.getCurrentJourney();
  }

  private createNewCheckpointInLocalDB(
    entityCheckpoint: EntityCheckpoint
  ): CheckpointModel {
    const id = new Realm.BSON.ObjectId();
    const checkpointSchemaName = "Checkpoint";
    const createdAt = new Date();
		const newCheckpointRecord = {
			_id: id,
			description: entityCheckpoint.getDescription(),
			starting_time: entityCheckpoint.getStartingTime(),
			createdAt: createdAt,
			photos: [],
		}
    // Write to Database
    this.realm.write(() => {
      this.realm.create(checkpointSchemaName, newCheckpointRecord);
    });
    const newCheckpointModel: CheckpointModel = {
      _id: id,
      journey_id: this.getCurrentJourneyFromLocalStorage()?._id,
      description: entityCheckpoint.getDescription(),
      starting_time: entityCheckpoint.getStartingTime(),
      createdAt: createdAt,
      photoIds: [],
    };

		this.appendNewCheckpointToCurrentJourney(
			this.getCurrentJourneyFromLocalStorage(),
			newCheckpointRecord
		)
    return newCheckpointModel;
  }

  private appendNewCheckpointToCurrentJourney(
    currentJourney: JourneyModel,
    newCheckpointRecord: any
  ) {
		// Upsert an Object: https://www.mongodb.com/docs/realm/sdk/react-native/crud/update/
		this.realm.write(() => {
      this.realm.create('Journey', {
        _id: currentJourney?._id,
        checkpoints: newCheckpointRecord,	// TODO: append to array, fix me
      });
    });

	}

  CreateNewCheckpointInCurrentJourney(entityCheckpoint: EntityCheckpoint) {
    const currentJourney = this.getCurrentJourneyFromLocalStorage();
    // save in local DB, append to journey schema
    const newCheckpoint = this.createNewCheckpointInLocalDB(entityCheckpoint);
    // TODO: save in store
  }
}
