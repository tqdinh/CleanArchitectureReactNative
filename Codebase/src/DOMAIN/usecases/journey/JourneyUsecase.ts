import EntityJourney from "DOMAIN/entities/EntityJourney";
import { JourneyRepository } from "DATA/repository/journey/JourneyRepository";

export interface JourneyUsecase {
  CreateNewJourney(entityJourney: EntityJourney): any;
  GetCurrentJourney(): EntityJourney | undefined;
  FinishCurrentJourney(): any;
  GetAllJourneys(): EntityJourney[];
  SetCurrentJourney(entityJourney: EntityJourney): any;
  SetCurrentJourneyStatus(entityJourney: EntityJourney): any;
}

export class JourneyUsecaseImpl implements JourneyUsecase {
  private repository: JourneyRepository;
  constructor(_repository: JourneyRepository) {
    this.repository = _repository;
  }
  SetCurrentJourneyStatus(entityJourney: EntityJourney) {
    this.repository.SetCurrentJourneyStatus(entityJourney);
  }
  SetCurrentJourney(entityJourney: EntityJourney) {
    this.repository.SetCurrentJourney(entityJourney);
  }

  FinishCurrentJourney() {
    this.repository.FinishCurrentJourney();
  }

  CreateNewJourney(entityJourney: EntityJourney) {
    this.repository.CreateNewJourney(entityJourney);
  }

  GetCurrentJourney(): EntityJourney | undefined {
    return this.repository.GetCurrentJourney();
  }

  GetAllJourneys(): EntityJourney[] {
    return this.repository.GetAllJourneys();
  }
}
