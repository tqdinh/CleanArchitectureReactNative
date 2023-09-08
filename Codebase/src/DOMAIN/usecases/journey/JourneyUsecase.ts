import EntityJourney from "DOMAIN/entities/EntityJourney"
import CommonUsecase from "../CommonUsecase"
import { JourneyRepository } from "DATA/repository/journey/JourneyRepository"
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint"
import EntityPhoto from "DOMAIN/entities/EntityPhoto"

export interface JourneyUsecase {
  CreateNewJourney(entityJourney: EntityJourney): any
  GetCurrentJourney(): EntityJourney | undefined
}

export class JourneyUsecaseImpl implements JourneyUsecase {
  private repository: JourneyRepository
  constructor(_repository: JourneyRepository) {
    this.repository = _repository
  }

  CreateNewJourney(entityJourney: EntityJourney) {
    this.repository.CreateNewJourney(entityJourney)
  }

  GetCurrentJourney(): EntityJourney | undefined {
    return this.repository.GetCurrentJourney()
  }

}