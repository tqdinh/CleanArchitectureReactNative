import { CheckpointRepository } from "DATA/repository/checkpoint/CheckpointRepository";
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";

export interface CheckpointUsecase {
  CreateNewCheckpointInCurrentJourney(entityCheckpoint: EntityCheckpoint): any;
}

export class CheckpointUsecaseImpl implements CheckpointUsecase {
  private repository: CheckpointRepository;
  constructor(_repository: CheckpointRepository) {
    this.repository = _repository;
  }
  CreateNewCheckpointInCurrentJourney(entityCheckpoint: EntityCheckpoint) {
    this.repository.CreateNewCheckpointInCurrentJourney(entityCheckpoint)
  }
}
