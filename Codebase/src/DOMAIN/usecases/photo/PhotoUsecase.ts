import { PhotoRepository } from "DATA/repository/photo/photoRepository";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export interface PhotoUsecase {
  saveNewPhoto(entityPhoto: EntityPhoto): any;
  GetAllPhotosFromCurrentJourney(currentJourneyEntity: EntityJourney): EntityPhoto[];
}

export class PhotoUsecaseImpl implements PhotoUsecase {
  private photoRepository: PhotoRepository;

  constructor(_photoRepository: PhotoRepository) {
    this.photoRepository = _photoRepository;
  }

  GetAllPhotosFromCurrentJourney(currentJourneyEntity: EntityJourney): EntityPhoto[] {
    return this.photoRepository.GetAllPhotosFromCurrentJourney(currentJourneyEntity)
  }

  saveNewPhoto(entityPhoto: EntityPhoto) {
    this.photoRepository.savePhoto(entityPhoto);
  }
}
