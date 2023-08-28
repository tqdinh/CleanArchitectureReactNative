import { useNavigation } from "@react-navigation/native"

const TrekkingMapViewModel = () => {

  const navigation = useNavigation<any>()

  const goToTrekkingCamera = () => {
    navigation.navigate("TrekkingCamera")
  }

  const startNewJourney = () => {
    console.log("Start New Journey!")
  }

  const finishJourney = () => {
    console.log("Finish the journey")
  }

  return { goToTrekkingCamera, startNewJourney, finishJourney }
}

export const useTrekkingMapViewModel = TrekkingMapViewModel
