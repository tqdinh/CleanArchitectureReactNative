import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";

export abstract class CheckpointDataSource {
  abstract CreateNewCheckpointInCurrentJourney(entityCheckpoint: EntityCheckpoint): any;
}
