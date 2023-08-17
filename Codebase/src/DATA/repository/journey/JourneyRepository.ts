import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint"
import EntityJourney from "DOMAIN/entities/EntityJourney"
import EntityPhoto from "DOMAIN/entities/EntityPhoto"

export interface JourneyRepository {
  Journey(entityJourney: EntityJourney): any
  Checkpoint(entityCheckpoint: EntityCheckpoint): any
  Photo(entityPhoto: EntityPhoto): any
}

export class JourneyRepositoryImpl implements JourneyRepository {
  Journey(entityJourney: EntityJourney) {
    throw new Error("Method not implemented.")
  }
  Checkpoint(entityCheckpoint: EntityCheckpoint) {
    throw new Error("Method not implemented.")
  }
  Photo(entityPhoto: EntityPhoto) {
    throw new Error("Method not implemented.")
  }

}