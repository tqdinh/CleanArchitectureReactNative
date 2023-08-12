import React, { FC, useEffect, useRef, useState } from "react"
import { Animated, Dimensions, FlatList, View } from "react-native"
import PhotoDetails from "./PhotoDetails"
import { PhotoCarouselStyle } from "../style"

const { width } = Dimensions.get("window")

const ITEM_LENGTH = width * 0.85 // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2

export interface PhotoCarouselItem {
  id: number
  uri: string
  title: string
  description: string
  location: string
}

interface PhotoCarouselProps {
  data: PhotoCarouselItem[]
}

const PhotoCarousel: FC<PhotoCarouselProps> = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState<
    PhotoCarouselItem[]
  >([])
  const currentIndex = useRef<number>(0)
  const flatListRef = useRef<FlatList<any>>(null)

  useEffect(() => {
    setDataWithPlaceholders([
      { id: -1, uri: "", title: "", description: "", location: "" },
      ...data,
      { id: data.length, uri: "", title: "", description: "", location: "" },
    ])
    currentIndex.current = 1
  }, [data])

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 1,
      },
      onViewableItemsChanged: ({ viewableItems }: any) => {
        const itemsInView = viewableItems.filter(
          ({ item }: { item: PhotoCarouselItem }) => item.uri && item.title
        )
        if (itemsInView.length === 0) {
          return
        }
        currentIndex.current = itemsInView[0].index
      },
    },
  ])

  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  })

  return (
    <View style={PhotoCarouselStyle.container}>
      <FlatList
        ref={flatListRef}
        data={dataWithPlaceholders}
        renderItem={({ item, index }) => {
          if (!item.uri || !item.title) {
            return <View style={{ width: EMPTY_ITEM_LENGTH }} />
          }

          const inputRange = [
            (index - 2) * ITEM_LENGTH,
            (index - 1) * ITEM_LENGTH,
            index * ITEM_LENGTH,
          ]

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, 0, 0],
            extrapolate: "clamp",
          })

          return (
            <View style={{ width: ITEM_LENGTH }}>
              <Animated.View
                style={[
                  {
                    transform: [{ translateY }],
                  },
                  PhotoCarouselStyle.itemContent,
                ]}
              >
                {/* <Image source={{uri: item.uri}} style={PhotoCarouselStyle.itemImage} />
                <Text style={PhotoCarouselStyle.itemText} numberOfLines={1}>
                  {item.title}
                </Text> */}
                <PhotoDetails
                  uri={item.uri}
                  title={item.title}
                  description={item.description}
                />
              </Animated.View>
            </View>
          )
        }}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        decelerationRate={"fast"}
        // renderToHardwareTextureAndroid
        contentContainerStyle={PhotoCarouselStyle.flatListContent}
        snapToInterval={ITEM_LENGTH}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
    </View>
  )
}

export default PhotoCarousel
