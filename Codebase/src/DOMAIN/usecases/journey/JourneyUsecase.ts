import EntityJourney from "DOMAIN/entities/EntityJourney"
import CommonUsecase from "../CommonUsecase"
import EntityPhoto from "DOMAIN/entities/EntityPhoto"
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint"

export interface JourneyUsecase extends CommonUsecase {
  Journey(entityJourney: EntityJourney): any
  Checkpoint(entityCheckpoint: EntityCheckpoint): any
  Photo(entityPhoto: EntityPhoto): any
}

export class JourneyUsecaseImpl implements JourneyUsecase {
  Journey(entityJourney: EntityJourney) {
    throw new Error("Method not implemented.")
  }
  Checkpoint(entityCheckpoint: EntityCheckpoint) {
    throw new Error("Method not implemented.")
  }
  Photo(entityPhoto: EntityPhoto) {
    throw new Error("Method not implemented.")
  }
  ResetQuerryStatus() {
    throw new Error("Method not implemented.")
  }

}