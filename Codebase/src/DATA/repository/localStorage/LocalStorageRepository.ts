import { LocalStorageLocalDataSource } from "DATA/dataSource/localStorage/LocalStorageLocalDataSource"
import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage"

export interface LocalStorageRepository {
  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage): any
  GetCurrentJourneyStatus(): EntityLocalStorage
}

export class LocalStorageRepositoryImpl implements LocalStorageRepository {
  private localDataSource: LocalStorageLocalDataSource
  constructor(_localDataSource: LocalStorageLocalDataSource) {
    this.localDataSource = _localDataSource
  }
  GetCurrentJourneyStatus(): EntityLocalStorage {
    return this.localDataSource.GetCurrentJourneyStatus()
  }
  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage) {
    this.localDataSource.SetCurrentJourneyStatus(entityLocalStorage)
  }
}