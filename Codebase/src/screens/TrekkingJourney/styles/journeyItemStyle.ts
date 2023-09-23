import { StyleSheet } from "react-native";

export const journeyItemStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderWidth: 3,
    marginBottom: 10,
  },
  detailContainer: { flexDirection: "row", padding: 10 },
  image: { width: 50, height: 50 },
  subcriberContainer: { flexDirection: "column", paddingLeft: 10 },
  subcriberText: { fontSize: 20, fontWeight: "bold", color: "black" },
  viewAllButton: { padding: 10, backgroundColor: "gray" },
  viewAllText: { color: "blue" },
});
