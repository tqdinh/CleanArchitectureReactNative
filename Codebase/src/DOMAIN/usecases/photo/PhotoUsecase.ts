import { PhotoRepository } from "DATA/repository/photo/photoRepository";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export interface PhotoUsecase {
	saveNewPhoto(entityPhoto: EntityPhoto) : any
}

export class PhotoUsecaseImpl implements PhotoUsecase {
	private photoRepository: PhotoRepository

	constructor(_photoRepository: PhotoRepository) {
		this.photoRepository = _photoRepository
	}

	saveNewPhoto(entityPhoto: EntityPhoto) {
		this.photoRepository.savePhoto(entityPhoto)
	}
}