import EntityPhoto from "DOMAIN/entities/EntityPhoto";
import { PhotoDataSource } from "./PhotoDataSource";
import { PhotoSchema } from "localDB/realm/PhotoSchema";
import { useRealm } from "@realm/react";
import EntityJourney from "DOMAIN/entities/EntityJourney";
import { JourneySchema } from "localDB/realm/JourneySchema";
import { CheckpointSchema } from "localDB/realm/CheckpointSchema";

interface PhotoLocalInterface {
  savePhoto(entityPhoto: EntityPhoto): any;
  GetAllPhotosFromCurrentJourney(
    currentJourneyEntity: EntityJourney
  ): EntityPhoto[];
}

export class PhotoLocalDataSource
  extends PhotoDataSource
  implements PhotoLocalInterface
{
  private realm = useRealm();

  private convertPhotoSchemaRecordToEntity(record: PhotoSchema): EntityPhoto {
    return new EntityPhoto(record.photo_path);
  }

  GetAllPhotosFromCurrentJourney(
    currentJourneyEntity: EntityJourney
  ): EntityPhoto[] {
    // const photos = this.realm.objects<PhotoSchema>(PhotoSchema.schema.name);
    // const entityPhotos: EntityPhoto[] = [];
    // for (let i = 0; i < photos.length; i++) {
    //   entityPhotos.push(this.convertPhotoSchemaRecordToEntity(photos[i]));
    // }
    // return entityPhotos;

    // get journey record from local DB
    if (currentJourneyEntity.getId() === undefined) {
      throw new Error("Error: Current Journey is undefined!");
    }
    const currentJourneyRecord = this.realm.objectForPrimaryKey<JourneySchema>(
      "Journey",
      currentJourneyEntity.getId()
    );
    if (currentJourneyRecord === null) return [];

    // get all photos in current journey
    const entityPhotos: EntityPhoto[] = [];

    for (let i = 0; i < currentJourneyRecord.checkpoints.length; i++) {
      const checkpoint = currentJourneyRecord.checkpoints[i];
      const checkpointRecord = this.realm.objectForPrimaryKey<CheckpointSchema>(
        "Checkpoint",
        checkpoint._id
      );
      if (checkpointRecord === null) continue;
      const photos = checkpointRecord.photos;

      for (let j = 0; j < photos.length; j++) {
        entityPhotos.push(this.convertPhotoSchemaRecordToEntity(photos[j]));
      }
    }
    return entityPhotos;
  }

  savePhoto(entityPhoto: EntityPhoto) {
    // TODO: save photo to Local
    this.realm.write(() => {
      this.realm.create("Photo", {
        _id: new Realm.BSON.ObjectID(),
        photo_path: entityPhoto.getPhotoPath(),
        title: "Photo 1",
        description:
          "This is photo 1. Really Long Description - just for demo!",
        createdAt: new Date(),
      });
    });
    console.log({ entityPhoto });
  }
}
