import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export abstract class JourneyDataSource {
  abstract CreateNewJourney(entityJourney: EntityJourney): any;
  abstract QueryAllJourneysInLocalDB(): EntityJourney[];
  abstract GetCurrentJourney(): EntityJourney | undefined;
  abstract FinishCurrentJourney(): any;
  abstract GetAllJourneys(): EntityJourney[];
  abstract SetCurrentJourney(entityJourney: EntityJourney): any;
  abstract SetCurrentJourneyStatus(entityJourney: EntityJourney): any;
}