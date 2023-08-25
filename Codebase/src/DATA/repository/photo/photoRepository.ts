import { PhotoDataSource } from "DATA/dataSource/photo/PhotoDataSource";
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export interface PhotoRepository {
  savePhoto(entityPhoto: EntityPhoto): any;
}

export class PhotoRepositoryImpl implements PhotoRepository {
  private localDataSource: PhotoDataSource;
  constructor(_localDataSource: PhotoDataSource) {
    this.localDataSource = _localDataSource;
  }

  savePhoto(entityPhoto: EntityPhoto) {
    this.localDataSource.savePhoto(entityPhoto)
  }
}
