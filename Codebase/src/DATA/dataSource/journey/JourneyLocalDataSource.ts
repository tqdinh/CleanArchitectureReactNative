import EntityJourney from "DOMAIN/entities/EntityJourney";
import { JourneyDataSource } from "./JourneyDataSource";
import { JourneyModel, JourneyStatus } from "models/JourneyModel";
import { useDispatch } from "react-redux";
import { JourneySchema } from "localDB/realm/JourneySchema";
import { useRealm } from "@realm/react";
import MMKVStorage from "mmkv/MMKVStorage";
import { UpdateMode } from "realm";
import { trekkingActions } from "redux/trekking/trekkingSlice";

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
    // query the last id
    const journeys = this.realm.objects<JourneySchema>("Journey");
    const id =
      journeys.length === 0 ? 1 : journeys[journeys.length - 1]._id + 1;
    const journeySchemaName = "Journey";
    const status = JourneyStatus.UNDEFINED;

    // Write to Database
    this.realm.write(() => {
      this.realm.create(journeySchemaName, {
        _id: id,
        title: entityJourney.getTitle(),
        image_header: entityJourney.getImageHeader(),
        total_subcriber: entityJourney.getTotalSubcriber(),
        status: status,
        checkpoints: [],
        createdAt: new Date(),
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

  private getJourneyByIdInLocalDB(id: number): JourneySchema | undefined {
    const journeys = this.realm.objects<JourneySchema>("Journey");
    for (let i = journeys.length - 1; i >= 0; i--) {
      const journey = journeys[i];
      if (journey._id === id) {
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

    // update all journey to redux
    const currentJourneys = this.realm.objects<JourneySchema>("Journey");
    let allJourneyModels: JourneyModel[] = [];
    for (let i = 0; i < currentJourneys.length; i++) {
      const journey = currentJourneys[i];
      const journeymodel: JourneyModel = {
        _id: journey._id,
        title: journey.title,
        image_header: journey.image_header ?? "",
        total_subcriber: journey.total_subcriber ?? 0,
        createdAtTimestamp: journey.createdAt.getTime(),
        status: journey.status,
      };
      allJourneyModels.push(journeymodel);
    }
    this.dispatch(trekkingActions.updateAllJourneys(allJourneyModels));
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
    // get current journey id from store

    return undefined;
  }

  FinishCurrentJourney() {
    const currentJourney = this.getCurrentJourneyInLocalDB();
    if (currentJourney === undefined) return;

    // set the status to FINISHED
    this.updateJourneyStatusInLocalDB(currentJourney, JourneyStatus.FINISHED);
  }

  GetAllJourneys(): EntityJourney[] {
    let allJourneyEntities: EntityJourney[] = [];
    let allJourneyModels: JourneyModel[] = [];
    const journeys = this.realm.objects<JourneySchema>("Journey");
    for (let i = 0; i < journeys.length; i++) {
      const journey = journeys[i];
      allJourneyEntities.push(
        new EntityJourney(
          journey._id,
          journey.title,
          journey.image_header,
          journey.total_subcriber,
          journey.createdAt,
          journey.status
        )
      );

      const journeymodel: JourneyModel = {
        _id: journey._id,
        title: journey.title,
        image_header: journey.image_header ?? "",
        total_subcriber: journey.total_subcriber ?? 0,
        createdAtTimestamp: journey.createdAt.getTime(),
        status: journey.status,
      };
      allJourneyModels.push(journeymodel);
    }

    // also update to redux
    this.dispatch(trekkingActions.updateAllJourneys(allJourneyModels));

    return allJourneyEntities;
  }

  SetCurrentJourney(entityJourney: EntityJourney) {
    // no need to update to local db
    const id = entityJourney.getId();
    if (id === undefined) return;
    // update to redux store
    this.dispatch(trekkingActions.updateCurrentJourneyById(id));
  }

  SetCurrentJourneyStatus(entityJourney: EntityJourney) {
    // update to local db
    const id = entityJourney.getId();
    const status = entityJourney.getStatus();
    if (id !== undefined && status !== undefined) {
      const currentJourneyRecord = this.getJourneyByIdInLocalDB(id);
      if (currentJourneyRecord !== undefined) {
        // update to local db
        this.updateJourneyStatusInLocalDB(currentJourneyRecord, status);
        // update to redux store
        this.dispatch(
          trekkingActions.updateCurrentJourneyStatusById({ id, status })
        );
      }
    }
  }
}
