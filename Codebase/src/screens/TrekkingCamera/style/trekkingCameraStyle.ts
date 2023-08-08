
import { Dimensions, StyleSheet } from 'react-native'
const height = Dimensions.get("window").height

export const cameraStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 20
  },
  button: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  captureButton: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  captureButtonBorder: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    borderColor: 'black',
    borderWidth: 1,
    position: 'absolute',
    right: 10,
  },
  textContainer: {
    height: 40,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    alignSelf: 'center',
    marginBottom: 5,
    justifyContent: 'center',
    marginTop: 15
  },
  text: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: 'center',
  },
})
