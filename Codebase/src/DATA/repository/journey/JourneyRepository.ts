import { JourneyLocalDataSource } from "DATA/dataSource/journey/JourneyLocalDataSource"
import EntityJourney from "DOMAIN/entities/EntityJourney"

export interface JourneyRepository {
  CreateNewJourney(entityJourney: EntityJourney): any
}

export class JourneyRepositoryImpl implements JourneyRepository {
  private localDataSource: JourneyLocalDataSource
  constructor(_localDataSource: JourneyLocalDataSource) {
    this.localDataSource = _localDataSource
  }

  CreateNewJourney(entityJourney: EntityJourney) {
    this.localDataSource.CreateNewJourney(entityJourney)
  }
  

}