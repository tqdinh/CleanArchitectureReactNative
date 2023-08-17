import { useNavigation } from "@react-navigation/native"

const TrekkingMapViewModel = () => {

  const navigation = useNavigation<any>()

  const goToTrekkingCamera = () => {
    navigation.navigate("TrekkingCamera")
  }

  return { goToTrekkingCamera }
}

export const useTrekkingMapViewModel = TrekkingMapViewModel
