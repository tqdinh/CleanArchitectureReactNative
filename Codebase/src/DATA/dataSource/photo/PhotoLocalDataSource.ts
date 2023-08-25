import EntityPhoto from "DOMAIN/entities/EntityPhoto";
import { PhotoDataSource } from "./PhotoDataSource";

interface PhotoLocalInterface {
	savePhoto(entityPhoto: EntityPhoto): any
}

export class PhotoLocalDataSource extends PhotoDataSource implements PhotoLocalInterface {
	savePhoto(entityPhoto: EntityPhoto) {
		// TODO: save photo to Local
		console.log({entityPhoto})
	}
}