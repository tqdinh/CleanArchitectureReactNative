import { JourneyLocalDataSource } from "DATA/dataSource/journey/JourneyLocalDataSource";
import EntityJourney from "DOMAIN/entities/EntityJourney";

export interface JourneyRepository {
  CreateNewJourney(entityJourney: EntityJourney): any;
  GetCurrentJourney(): EntityJourney | undefined;
  FinishCurrentJourney(): any;
  GetAllJourneys(): EntityJourney[];
  SetCurrentJourney(entityJourney: EntityJourney): any;
  SetCurrentJourneyStatus(entityJourney: EntityJourney): any;
}

export class JourneyRepositoryImpl implements JourneyRepository {
  private localDataSource: JourneyLocalDataSource;
  constructor(_localDataSource: JourneyLocalDataSource) {
    this.localDataSource = _localDataSource;
  }
  SetCurrentJourneyStatus(entityJourney: EntityJourney) {
    this.localDataSource.SetCurrentJourneyStatus(entityJourney);
  }
  SetCurrentJourney(entityJourney: EntityJourney) {
    this.localDataSource.SetCurrentJourney(entityJourney);
  }
  GetAllJourneys(): EntityJourney[] {
    return this.localDataSource.GetAllJourneys();
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
