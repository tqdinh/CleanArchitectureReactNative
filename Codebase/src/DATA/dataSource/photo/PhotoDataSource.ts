import EntityPhoto from "DOMAIN/entities/EntityPhoto";

export abstract class PhotoDataSource {
  abstract savePhoto(entityPhoto: EntityPhoto): any
}
