import { CheckpointLocalDataSource } from "DATA/dataSource/checkpoint/CheckpointLocalDataSource"
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";

export interface CheckpointRepository {
  CreateNewCheckpointInCurrentJourney(entityCheckpoint: EntityCheckpoint): any;
}

export class CheckpointRepositoryImpl implements CheckpointRepository {
  private localDataSource: CheckpointLocalDataSource
  constructor(_localDataSource: CheckpointLocalDataSource) {
    this.localDataSource = _localDataSource
  }

  CreateNewCheckpointInCurrentJourney(entityCheckpoint: EntityCheckpoint) {
    this.localDataSource.CreateNewCheckpointInCurrentJourney(entityCheckpoint)
  }

}