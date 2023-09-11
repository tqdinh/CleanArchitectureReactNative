import EntityJourney from "DOMAIN/entities/EntityJourney";
import { JourneyDataSource } from "./JourneyDataSource";
import { JourneyModel, JourneyStatus } from "models/JourneyModel";
import { useDispatch } from "react-redux";
import { JourneySchema } from "localDB/realm/JourneySchema";
import { useRealm } from "@realm/react";
import MMKVStorage from "mmkv/MMKVStorage";
import { UpdateMode } from "realm";

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

  private createNewJourneyInLocalDB(entityJourney: EntityJourney) {
    const id = new Realm.BSON.ObjectId();
    const journeySchemaName = "Journey";
    const status = JourneyStatus.STARTED;

    // Write to Database
    this.realm.write(() => {
      this.realm.create(journeySchemaName, {
        _id: id,
        title: entityJourney.getTitle(),
        image_header: entityJourney.getImageHeader(),
        total_subcriber: entityJourney.getTotalSubcriber(),
        status: status,
        checkpoints: [],
      });
    });
  }

  private updateJourneyStatusInLocalDB(
    journey: JourneySchema,
    status: JourneyStatus
  ) {
    this.realm.write(() => {
      this.realm.create(
        "Journey",
        { _id: journey._id, status: status },
        UpdateMode.Modified
      );
    });
  }

  private deleteAllJourneysInLocalDB() {
    const journeys = this.realm.objects<JourneySchema>("Journey");
    this.realm.write(() => {
      this.realm.delete(journeys);
    });
  }

  private getCurrentJourneyInLocalDB(): JourneySchema | undefined {
    const journeys = this.realm.objects<JourneySchema>("Journey");
    for (let i = journeys.length - 1; i >= 0; i--) {
      const journey = journeys[i];
      if (
        journey.status === JourneyStatus.STARTED ||
        journey.status === JourneyStatus.PAUSED
      ) {
        return journey;
      }
    }
    return undefined;
  }

  CreateNewJourney(entityJourney: EntityJourney) {
    // Change state of other journey to FINISHED when create new Journey
    const journeys = this.realm.objects<JourneySchema>("Journey");
    for (let i = 0; i < journeys.length; i++) {
      const journey = journeys[i];
      if (
        journey.status === JourneyStatus.STARTED ||
        journey.status === JourneyStatus.PAUSED
      ) {
        this.updateJourneyStatusInLocalDB(journey, JourneyStatus.FINISHED);
      }
    }
    // Save new to Local DB
    this.createNewJourneyInLocalDB(entityJourney);
    // Save 'Journey Started State' to Local Storage (MMKV)
    // this.setCurrentJourneyInLocalStorage(newJourney);
    // Save New Journey in Redux Store
    // this.dispatch(trekkingActions.updateCurrentTrekkingJourney(newJourney));

    this.QueryAllJourneysInLocalDB();
  }

  QueryAllJourneysInLocalDB(): EntityJourney[] {
    // TODO: get all journey saved in LocalDB
    // if (!this.realm) return
    const journeys = this.realm.objects("Journey");
    console.log(JSON.stringify(journeys));

    // return [new EntityJourney({})]
    return [];
  }

  GetCurrentJourney(): EntityJourney | undefined {
    // // Get From Local Storage
    const currentJourney = this.getCurrentJourneyInLocalDB();
    if (currentJourney === undefined) return;
    // convert from JourneyModel To EntityJourney
    const entityJourney = new EntityJourney(
      currentJourney._id,
      currentJourney.title,
      currentJourney.image_header,
      currentJourney.total_subcriber,
      currentJourney.createdAt,
      currentJourney.status
    );
    return entityJourney;
  }

  FinishCurrentJourney() {
    const currentJourney = this.getCurrentJourneyInLocalDB();
    if (currentJourney === undefined) return;

    // set the status to FINISHED
    this.updateJourneyStatusInLocalDB(currentJourney, JourneyStatus.FINISHED);
  }
}
