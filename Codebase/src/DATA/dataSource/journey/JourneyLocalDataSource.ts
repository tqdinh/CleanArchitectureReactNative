import EntityJourney from "DOMAIN/entities/EntityJourney";
import { JourneyDataSource } from "./JourneyDataSource";
import { JourneyModel, JourneyStatus } from "models/JourneyModel";
import { LocalStorageLocalDataSource } from "../localStorage/LocalStorageLocalDataSource";
import { LocalStorageUsecaseImpl } from "DOMAIN/usecases/localStorage/LocalStorageUsecase";
import { LocalStorageRepositoryImpl } from "DATA/repository/localStorage/LocalStorageRepository";
import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage";
import { useDispatch } from "react-redux";
import { trekkingActions } from "redux/trekking/trekkingSlice";
import { JourneySchema } from "localDB/realm/JourneySchema";
import { useRealm } from "@realm/react";
import EntityCheckpoint from "DOMAIN/entities/EntityCheckpoint";
import EntityPhoto from "DOMAIN/entities/EntityPhoto";
import MMKVStorage from "mmkv/MMKVStorage";

export class JourneyLocalDataSource implements JourneyDataSource {
  private dispatch = useDispatch();
  private realm = useRealm();

  private setCurrentJourneyInLocalStorage(journey: JourneyModel) {
    MMKVStorage.saveCurrentJourney(journey);
  }

  private getCurrentJourneyInLocalStorage(): JourneyModel {
    return MMKVStorage.getCurrentJourney();
  }

  private deleteCurrentJourneyInLocalStorage() {
    MMKVStorage.saveCurrentJourney(undefined);
  }

  private createNewJourneyInLocalDB(
    entityJourney: EntityJourney
  ): JourneyModel {
    const id = new Realm.BSON.ObjectId();
    const journeySchemaName = "Journey";
    const createdAt = new Date();

    // Write to Database
    this.realm.write(() => {
      this.realm.create(journeySchemaName, {
        _id: id,
        title: entityJourney.getTitle(),
        image_header: entityJourney.getImageHeader(),
        total_subcriber: entityJourney.getTotalSubcriber(),
        createdAt: createdAt,
        status: JourneyStatus.STARTED,
        checkpoints: [],
      });
    });

    // Create JourneyModel to return
    const newJourney: JourneyModel = {
      _id: id,
      title: entityJourney.getTitle() ?? "No title",
      image_header: entityJourney.getImageHeader() ?? "",
      total_subcriber: entityJourney.getTotalSubcriber() ?? 0,
      createdAt: createdAt,
      status: JourneyStatus.STARTED,
      checkpointIds: [],
    };

    return newJourney;
  }

  CreateNewJourney(entityJourney: EntityJourney) {
    // Save it to Local DB
    const newJourney: JourneyModel =
      this.createNewJourneyInLocalDB(entityJourney);
    // Save 'Journey Started State' to Local Storage (MMKV)
    this.setCurrentJourneyInLocalStorage(newJourney);
    // Save New Journey in Redux Store
    this.dispatch(trekkingActions.updateCurrentTrekkingJourney(newJourney));
  }

  QueryAllJourneysInLocalDB(): EntityJourney[] {
    // TODO: get all journey saved in LocalDB
    // if (!this.realm) return
    // const journeys = this.realm.objects('Journey')
    // console.log(JSON.stringify(journeys))

    // return [new EntityJourney({})]
    return [];
  }

  GetCurrentJourney(): EntityJourney {
    // Get From Local Storage
    const currentJourney = this.getCurrentJourneyInLocalStorage();
    // convert from JourneyModel To EntityJourney
    const entityJourney = new EntityJourney(
      currentJourney?.title,
      currentJourney?.image_header,
      currentJourney?.total_subcriber,
      currentJourney?.createdAt
    );
    return entityJourney;
  }
}
