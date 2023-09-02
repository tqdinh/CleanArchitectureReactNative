import EntityJourney from "DOMAIN/entities/EntityJourney"
import CommonUsecase from "../CommonUsecase"
import { JourneyRepository } from "DATA/repository/journey/JourneyRepository"

export interface JourneyUsecase {
  CreateNewJourney(entityJourney: EntityJourney): any
}

export class JourneyUsecaseImpl implements JourneyUsecase {
  private repository: JourneyRepository
  constructor(_repository: JourneyRepository) {
    this.repository = _repository
  }
  
  CreateNewJourney(entityJourney: EntityJourney) {
    this.repository.CreateNewJourney(entityJourney)
  }

}