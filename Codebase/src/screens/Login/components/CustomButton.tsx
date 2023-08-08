//import liraries
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Colors } from 'themes/colors'

// create a component
type buttonProp = {
  text: string
  color?: string
  onPress: any
  disabled: boolean
  textColor?: string
  loading?: boolean
  top?: number
}
const CustomButton = ({
  text,
  onPress,
  color,
  disabled,
  textColor,
  loading,
  top
}: buttonProp) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles.shadowButton,
        { marginTop: top },
        color
          ? { backgroundColor: color }
          : { backgroundColor: Colors.SystemGrey00 }
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {loading === true ? (
        <ActivityIndicator color={Colors.SystemWhite} />
      ) : (
        <Text style={[styles.textButton, { color: textColor }]}>{text}</Text>
      )}
    </TouchableOpacity>
  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 40,
    minWidth: 200,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    width: 200,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center'
  },
  shadowButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  }
})

//make this component available to the app
export default CustomButton
