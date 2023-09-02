import EntityJourney from "DOMAIN/entities/EntityJourney"
import { JourneyDataSource } from "./JourneyDataSource"
import { JourneyStatus, TrekkingJourney } from "models/JourneyModel"
import { LocalStorageLocalDataSource } from "../localStorage/LocalStorageLocalDataSource"
import { LocalStorageUsecaseImpl } from "DOMAIN/usecases/localStorage/LocalStorageUsecase"
import { LocalStorageRepositoryImpl } from "DATA/repository/localStorage/LocalStorageRepository"
import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage"
import { useDispatch } from "react-redux"
import { trekkingActions } from "redux/trekking/trekkingSlice"

export class JourneyLocalDataSource implements JourneyDataSource {
  private localStorageLocalDataSource: LocalStorageLocalDataSource
  private localStorageUsecase: LocalStorageUsecaseImpl
  private dispatch = useDispatch()

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
    this.setJourneyStatusToLocalStorage(JourneyStatus.STARTED)
    // Save New Journey in Redux Store (No, this should be saved in DataSource layer)
    const journey: TrekkingJourney = {
      title: entityJourney.getTitle(),
      image_header: entityJourney.getImageHeader(),
      total_subcriber: entityJourney.getTotalSubcriber(),
      createdAt: entityJourney.getDateCreated(),
      status: JourneyStatus.STARTED
    }
    this.dispatch(trekkingActions.updateCurrentTrekkingJourney(journey))

  }
}
