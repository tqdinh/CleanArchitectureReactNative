import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage";
import { LocalStorageDataSource } from "./LocalStorageDataSource";
import MMKVStorage from "mmkv/MMKVStorage";
import { JourneyStatus } from "models/JourneyModel";
import { MMKVKeys } from "mmkv/MMKVKeys";

interface LocalStorageLocalInterface {
  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage): any;
  GetCurrentJourneyStatus(): EntityLocalStorage;
}

export class LocalStorageLocalDataSource
  extends LocalStorageDataSource
  implements LocalStorageLocalInterface
{
  GetCurrentJourneyStatus(): EntityLocalStorage {
    let currentJourneyStatus = MMKVStorage.getStringValueFromKey(
      MMKVKeys.JOURNEY_STATUS
    );

    if (currentJourneyStatus === undefined) {
      currentJourneyStatus = JourneyStatus.UNDEFINED
    }

    return new EntityLocalStorage(currentJourneyStatus);
  }

  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage) {
    MMKVStorage.saveStringValue(
      MMKVKeys.JOURNEY_STATUS,
      entityLocalStorage.getValue()
    );
  }
}
