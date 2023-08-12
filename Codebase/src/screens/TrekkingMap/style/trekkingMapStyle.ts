import { Dimensions, StyleSheet } from "react-native"

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export const trekkingMapStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  mapContainer: {
    height: height * 0.7,
    width: width,
  },
  map: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 30,
    justifyContent: "space-around",
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    justifyContent: "center",
  },
  text: {
    fontSize: 11,
    alignSelf: "center",
    color: "black",
  },
  buttonCurrentPosition: {
    position: "absolute",
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: "white",
    opacity: 0.7,
    marginTop: 30,
    right: 10,
    justifyContent: "center",
  },
  carouselContainer: {
    flex: 1,
  },
  carousel: {
    alignSelf: "center",
  },
  carouselBackButton: {
    position: "absolute",
  },
})
