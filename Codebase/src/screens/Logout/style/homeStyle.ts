
import { Dimensions, StyleSheet } from 'react-native'
import { Colors } from 'themes/colors'

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  bodyContainer: {
    flex: 1
  },
  textInput: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.15,
    marginHorizontal: 10
  },
  search: {
    flex: 0.9,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10
  },
  indicator: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  centeredView: {
    height: Dimensions.get('screen').height,
    backgroundColor: Colors.SystemGrey02
  },
  modalView: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.SystemPrimary,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: -1
  },
  textStyle: {
    color: Colors.SystemSecondary,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  textName: {
    color: Colors.SystemBlack,
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5
  },
  textPrice: {
    color: Colors.SystemGrey01,
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.25
  },
  thumbnail: {
    height: 80,
    width: 80,
    borderRadius: 10
  }
})
