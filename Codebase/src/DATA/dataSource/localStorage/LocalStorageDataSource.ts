import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage"

export abstract class LocalStorageDataSource {
  abstract SetCurrentJourneyStatus(entityLocalStorage: EntityLocalStorage): any
  abstract GetCurrentJourneyStatus(): EntityLocalStorage
}
