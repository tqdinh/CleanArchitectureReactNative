import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export abstract class CheckpointDataSource {
  abstract CreateNewCheckpointWithPhotoInCurrentJourney(
    entityCheckpoint: EntityCheckpoint,
    entityPhoto: EntityPhoto,
    entityJourney: EntityJourney
  ): any;
}
