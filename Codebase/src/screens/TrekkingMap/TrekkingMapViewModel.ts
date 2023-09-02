import { useNavigation } from "@react-navigation/native"
import { JourneyLocalDataSource } from "DATA/dataSource/journey/JourneyLocalDataSource"
import { LocalStorageLocalDataSource } from "DATA/dataSource/localStorage/LocalStorageLocalDataSource"
import { JourneyRepositoryImpl } from "DATA/repository/journey/JourneyRepository"
import { LocalStorageRepositoryImpl } from "DATA/repository/localStorage/LocalStorageRepository"
import EntityJourney from "DOMAIN/entities/EntityJourney"
import EntityLocalStorage from "DOMAIN/entities/EntityLocalStorage"
import { JourneyUsecaseImpl } from "DOMAIN/usecases/journey/JourneyUsecase"
import { LocalStorageUsecaseImpl } from "DOMAIN/usecases/localStorage/LocalStorageUsecase"
import { JourneyStatus } from "models/JourneyModel"

const TrekkingMapViewModel = () => {
  const navigation = useNavigation<any>()
  // journey
  const journeyLocalDataSource = new JourneyLocalDataSource()
  const journeyUsecase = new JourneyUsecaseImpl(
    new JourneyRepositoryImpl(journeyLocalDataSource)
  )
  // local storage
  const localStorageLocalDataSource = new LocalStorageLocalDataSource()
  const localStorageUsecase = new LocalStorageUsecaseImpl(
    new LocalStorageRepositoryImpl(localStorageLocalDataSource)
  )

  const goToTrekkingCamera = () => {
    navigation.navigate("TrekkingCamera")
  }

  const startNewJourney = () => {
    console.log("Start New Journey!")
    const entityJourney = new EntityJourney(
      "New Testing Journey",
      "",
      100,
      Date.now()
    )
    journeyUsecase.CreateNewJourney(entityJourney)
  }

  const finishJourney = () => {
    // TODO: Wrap everything up to finish a journey
    console.log("Finish the journey")

    localStorageUsecase.SetCurrentJourneyStatus(
      new EntityLocalStorage(JourneyStatus.FINISHED)
    )
  }

  const getSavedJourneyStatusInLocalStorage = () => {
    const journeyLocalStorageEntity =
      localStorageUsecase.GetCurrentJourneyStatus()
    return journeyLocalStorageEntity.getValue()
  }

  return {
    goToTrekkingCamera,
    startNewJourney,
    finishJourney,
    getSavedJourneyStatusInLocalStorage,
  }
}

export const useTrekkingMapViewModel = TrekkingMapViewModel
