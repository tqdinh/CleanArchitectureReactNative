import { JourneyLocalDataSource } from "DATA/dataSource/journey/JourneyLocalDataSource";
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export interface JourneyRepository {
  CreateNewJourney(entityJourney: EntityJourney): any;
  GetCurrentJourney(): EntityJourney | undefined;
  FinishCurrentJourney(): any;
}

export class JourneyRepositoryImpl implements JourneyRepository {
  private localDataSource: JourneyLocalDataSource;
  constructor(_localDataSource: JourneyLocalDataSource) {
    this.localDataSource = _localDataSource;
  }

  FinishCurrentJourney() {
    this.localDataSource.FinishCurrentJourney();
  }
  GetCurrentJourney(): EntityJourney | undefined {
    return this.localDataSource.GetCurrentJourney();
  }

  CreateNewJourney(entityJourney: EntityJourney) {
    this.localDataSource.CreateNewJourney(entityJourney);
  }
}
