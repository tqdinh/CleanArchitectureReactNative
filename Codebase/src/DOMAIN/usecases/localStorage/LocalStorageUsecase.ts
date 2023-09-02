import { LocalStorageRepository } from "DATA/repository/localStorage/LocalStorageRepository"
import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage"

export interface LocalStorageUsecase {
  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage): any
}

export class LocalStorageUsecaseImpl implements LocalStorageUsecase {
  private repository: LocalStorageRepository
  constructor(_repository: LocalStorageRepository) {
    this.repository = _repository
  }
  SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage) {
    this.repository.SetCurrentJourneyStatus(entityLocalStorage)
  }
}
