import { Dimensions, StyleSheet } from "react-native"

const width = Dimensions.get("window").width
const ITEM_LENGTH = width*0.85;

export const PhotoCarouselStyle = StyleSheet.create({
  container: {},
  flatListContent: {
    alignItems: 'center',
  },
  item: {},
  itemContent: {
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    position: 'absolute',
    color: 'white',
    fontWeight: '600',
  },
  itemImage: {
    width: '100%',
    height: ITEM_LENGTH,
    resizeMode: 'cover',
  },
})
