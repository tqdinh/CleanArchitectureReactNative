import EntityJourney from "DOMAIN/entities/EntityJourney";
import { JourneyRepository } from "DATA/repository/journey/JourneyRepository";

export interface JourneyUsecase {
  CreateNewJourney(entityJourney: EntityJourney): any;
  GetCurrentJourney(): EntityJourney | undefined;
  FinishCurrentJourney(): any;
  GetAllJourneys(): EntityJourney[];
}

export class JourneyUsecaseImpl implements JourneyUsecase {
  private repository: JourneyRepository;
  constructor(_repository: JourneyRepository) {
    this.repository = _repository;
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
