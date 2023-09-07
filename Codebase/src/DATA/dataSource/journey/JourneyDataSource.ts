import EntityJourney from "DOMAIN/entities/EntityJourney";

export abstract class JourneyDataSource {
  abstract CreateNewJourney(entityJourney: EntityJourney): any
  abstract QueryAllJourneysInLocalDB(): any
}
