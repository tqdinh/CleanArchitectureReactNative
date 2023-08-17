export abstract class JourneyDataSource {
  abstract QueryJourney(): any
  abstract QueryCheckpoints(): any
  abstract QueryPhotos(): any
}
