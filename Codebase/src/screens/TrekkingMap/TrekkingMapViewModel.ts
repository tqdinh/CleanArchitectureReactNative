import { useNavigation } from "@react-navigation/native"
import { JourneyLocalDataSource } from "DATA/dataSource/journey/JourneyLocalDataSource"
import { JourneyRepositoryImpl } from "DATA/repository/journey/JourneyRepository"
import EntityJourney from "DOMAIN/entities/EntityJourney"
import { JourneyUsecaseImpl } from "DOMAIN/usecases/journey/JourneyUsecase"

const TrekkingMapViewModel = () => {

  const navigation = useNavigation<any>()
  const journeyLocalDataSource = new JourneyLocalDataSource()
  const journeyUsecase = new JourneyUsecaseImpl(new JourneyRepositoryImpl(journeyLocalDataSource))

  const goToTrekkingCamera = () => {
    navigation.navigate("TrekkingCamera")
  }

  const startNewJourney = () => {
    console.log("Start New Journey!")
    const entityJourney = new EntityJourney(
      'New Testing Journey',
      '',
      '',
      Date.now()
    )
    journeyUsecase.CreateNewJourney(entityJourney)

  }

  const finishJourney = () => {
    // TODO: Wrap everything up to finish a journey 
    console.log("Finish the journey")
  }

  return { goToTrekkingCamera, startNewJourney, finishJourney }
}

export const useTrekkingMapViewModel = TrekkingMapViewModel
