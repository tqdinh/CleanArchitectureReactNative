import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export abstract class PhotoDataSource {
  abstract savePhoto(entityPhoto: EntityPhoto): any
  abstract GetAllPhotosFromCurrentJourney(currentJourneyEntity: EntityJourney): EntityPhoto[];
}
