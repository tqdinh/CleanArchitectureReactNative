import { CheckpointLocalDataSource } from "DATA/dataSource/checkpoint/CheckpointLocalDataSource";
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export interface CheckpointRepository {
  CreateNewCheckpointWithPhotoInCurrentJourney(
    entityCheckpoint: EntityCheckpoint,
    entityPhoto: EntityPhoto,
    entityJourney: EntityJourney
  ): any;
}

export class CheckpointRepositoryImpl implements CheckpointRepository {
  private localDataSource: CheckpointLocalDataSource;
  constructor(_localDataSource: CheckpointLocalDataSource) {
    this.localDataSource = _localDataSource;
  }

  CreateNewCheckpointWithPhotoInCurrentJourney(
    entityCheckpoint: EntityCheckpoint,
    entityPhoto: EntityPhoto,
    entityJourney: EntityJourney
  ) {
    this.localDataSource.CreateNewCheckpointWithPhotoInCurrentJourney(
      entityCheckpoint,
      entityPhoto,
      entityJourney
    );
  }
}
