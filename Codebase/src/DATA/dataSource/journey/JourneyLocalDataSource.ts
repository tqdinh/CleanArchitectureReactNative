import EntityJourney from "DOMAIN/entities/EntityJourney"
import { JourneyDataSource } from "./JourneyDataSource"
import { JourneyStatus } from "models/JourneyModel"
import { LocalStorageLocalDataSource } from "../localStorage/LocalStorageLocalDataSource"
import { LocalStorageUsecaseImpl } from "DOMAIN/usecases/localStorage/LocalStorageUsecase"
import { LocalStorageRepositoryImpl } from "DATA/repository/localStorage/LocalStorageRepository"
import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage"

export class JourneyLocalDataSource implements JourneyDataSource {
  private localStorageLocalDataSource: LocalStorageLocalDataSource
  private localStorageUsecase: LocalStorageUsecaseImpl

  constructor () {
    this.localStorageLocalDataSource = new LocalStorageLocalDataSource()
    this.localStorageUsecase = new LocalStorageUsecaseImpl(
      new LocalStorageRepositoryImpl(this.localStorageLocalDataSource)
    )
  }
  private setJourneyStatusToLocalStorage(status: JourneyStatus) {
    const entityLocalStorage = new EntityLocalStorage(status)
    this.localStorageUsecase.SetCurrentJourneyStatus(entityLocalStorage)
  }

  CreateNewJourney(entityJourney: EntityJourney) {
    // TODO:
    // Save it to Local DB
    // Save 'Journey Started State' to Local Storage (MMKV)
    // Save New Journey in Redux Store (No, this should be saved in DataSource layer)
    this.setJourneyStatusToLocalStorage(JourneyStatus.STARTED)
  }
}
