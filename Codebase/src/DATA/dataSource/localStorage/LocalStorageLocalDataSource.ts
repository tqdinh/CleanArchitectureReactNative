import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage"
import { LocalStorageDataSource } from "./LocalStorageDataSource"
import { MMKV } from "react-native-mmkv"
import { MMKVKeys } from "models/LocalStorageModel"

interface LocalStorageLocalInterface {
  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage): any
  GetCurrentJourneyStatus(): EntityLocalStorage
}

export class LocalStorageLocalDataSource
  extends LocalStorageDataSource
  implements LocalStorageLocalInterface
{
  private localStorage: MMKV
  // constructor(_localStorage: MMKV) {
  //   super()
  //   this.localStorage = _localStorage
  // }
  constructor() {
    super()
    this.localStorage = new MMKV()
  }

  GetCurrentJourneyStatus(): EntityLocalStorage {
    const currentJourneyStatus = this.localStorage.getString(MMKVKeys.JOURNEY_STATUS)
    return new EntityLocalStorage(currentJourneyStatus)
  }
  
  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage) {
    this.localStorage.set(
      MMKVKeys.JOURNEY_STATUS,
      entityLocalStorage.getValue()
    )
    console.log({entityLocalStorage})
  }

}
