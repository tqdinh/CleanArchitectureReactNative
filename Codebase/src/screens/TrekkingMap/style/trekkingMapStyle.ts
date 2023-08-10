
import { Dimensions, StyleSheet } from 'react-native'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export const trekkingMapStyle = StyleSheet.create({
  container: {
    height: height*0.7,
    width: width,
  },
  map: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    justifyContent: 'center',
  },
  text: {
    fontSize: 11,
    alignSelf: 'center',
  },
})
