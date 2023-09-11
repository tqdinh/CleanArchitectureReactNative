import { LocalStorageRepository } from "DATA/repository/localStorage/LocalStorageRepository"
import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage"

export interface LocalStorageUsecase {
  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage): any
  GetCurrentJourneyStatus(): EntityLocalStorage
}

export class LocalStorageUsecaseImpl implements LocalStorageUsecase {
  private repository: LocalStorageRepository
  constructor(_repository: LocalStorageRepository) {
    this.repository = _repository
  }
  GetCurrentJourneyStatus(): EntityLocalStorage {
    return this.repository.GetCurrentJourneyStatus()
  }
  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage) {
    this.repository.SetCurrentJourneyStatus(entityLocalStorage)
  }
}
