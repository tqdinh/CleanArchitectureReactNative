import { JourneyDataSource } from "./JourneyDataSource"

export class JourneyLocalDataSource implements JourneyDataSource {
  QueryJourney() {
    throw new Error("Method not implemented.");
  }
  QueryCheckpoints() {
    throw new Error("Method not implemented.");
  }
  QueryPhotos() {
    throw new Error("Method not implemented.");
  }
}