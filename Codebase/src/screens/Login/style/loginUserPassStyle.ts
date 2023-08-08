import { Dimensions, StyleSheet } from 'react-native'
import { Colors } from 'themes/colors'

const { width, height } = Dimensions.get('window')
const loginUserPassStyle = StyleSheet.create({
  backgroundContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageLogoContainer: {
    width: width,
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    width: width,
    height: height,
    backgroundColor: Colors.SystemWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 20
  }
})

export default loginUserPassStyle
