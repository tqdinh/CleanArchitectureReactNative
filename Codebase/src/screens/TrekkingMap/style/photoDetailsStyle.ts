import { Dimensions, StyleSheet } from "react-native"

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export const photoDetailsStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    width: width * 0.82,
    padding: 5,
    backgroundColor: "white",
  },
  photo: {
    width: height * 0.15,
    height: height * 0.15,
  },
  informationContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  buttonContainer: { flexDirection: "row", alignItems: "center" },
  button: {
    backgroundColor: "#189AB4",
    height: 30,
    justifyContent: "center",
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  text: { color: "white" },
})
