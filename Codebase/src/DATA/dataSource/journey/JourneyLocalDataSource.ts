import EntityJourney from "DOMAIN/entities/EntityJourney";
import { JourneyDataSource } from "./JourneyDataSource"

export class JourneyLocalDataSource implements JourneyDataSource {
  CreateNewJourney(entityJourney: EntityJourney) {
    // TODO: 
    // Create new Entity Journey
    // Save it to Local DB
    // Save 'Journey Started State' to Local Storage (MMKV)
    // Save New Journey in Redux Store (No, this should be saved in DataSource layer)
    console.log({entityJourney})
  }
}