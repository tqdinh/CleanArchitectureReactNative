import { JourneyLocalDataSource } from "DATA/dataSource/journey/JourneyLocalDataSource"
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint"
import EntityJourney from "DOMAIN/entities/EntityJourney"
import EntityPhoto from "DOMAIN/entities/EntityPhoto"

export interface JourneyRepository {
  CreateNewJourney(entityJourney: EntityJourney): any
  GetCurrentJourney(): EntityJourney
}

export class JourneyRepositoryImpl implements JourneyRepository {
  private localDataSource: JourneyLocalDataSource
  constructor(_localDataSource: JourneyLocalDataSource) {
    this.localDataSource = _localDataSource
  }
  GetCurrentJourney(): EntityJourney {
    return this.localDataSource.GetCurrentJourney()
  }

  CreateNewJourney(entityJourney: EntityJourney) {
    this.localDataSource.CreateNewJourney(entityJourney)
  }
  

}