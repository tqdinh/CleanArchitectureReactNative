import React from "react"
import { View } from "react-native"
import Svg, { Path } from "react-native-svg"
import { arrowStyle } from "../style"

interface ArrowProps {
  width: number
  height: number
  color: string
  length?: number
}

const Arrow: React.FC<ArrowProps> = ({ width, height, color, length }) => {
  return (
    <View style={arrowStyle.container}>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 6V30M12 6L6 12M12 6L18 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  )
}

export default Arrow
