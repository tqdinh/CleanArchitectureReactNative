import { PhotoDataSource } from "DATA/dataSource/photo/PhotoDataSource";
import { PhotoLocalDataSource } from "DATA/dataSource/photo/PhotoLocalDataSource";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export interface PhotoRepository {
  savePhoto(entityPhoto: EntityPhoto): any;
  GetAllPhotosFromCurrentJourney(currentJourneyEntity: EntityJourney): EntityPhoto[];
}

export class PhotoRepositoryImpl implements PhotoRepository {
  private localDataSource: PhotoLocalDataSource;
  constructor(_localDataSource: PhotoLocalDataSource) {
    this.localDataSource = _localDataSource;
  }

  GetAllPhotosFromCurrentJourney(currentJourneyEntity: EntityJourney): EntityPhoto[] {
    return this.localDataSource.GetAllPhotosFromCurrentJourney(currentJourneyEntity)
  }

  savePhoto(entityPhoto: EntityPhoto) {
    this.localDataSource.savePhoto(entityPhoto)
  }
}
