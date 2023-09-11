import { CheckpointRepository } from "DATA/repository/checkpoint/CheckpointRepository";
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export interface CheckpointUsecase {
  CreateNewCheckpointWithPhotoInCurrentJourney(
    entityCheckpoint: EntityCheckpoint,
    entityPhoto: EntityPhoto,
    entityJourney: EntityJourney
  ): any;
}

export class CheckpointUsecaseImpl implements CheckpointUsecase {
  private repository: CheckpointRepository;
  constructor(_repository: CheckpointRepository) {
    this.repository = _repository;
  }
  CreateNewCheckpointWithPhotoInCurrentJourney(
    entityCheckpoint: EntityCheckpoint,
    entityPhoto: EntityPhoto,
    entityJourney: EntityJourney
  ) {
    this.repository.CreateNewCheckpointWithPhotoInCurrentJourney(
      entityCheckpoint,
      entityPhoto,
      entityJourney
    );
  }
}
