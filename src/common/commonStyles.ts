import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: { width: -1, height: 1 },
    shadowRadius: 1,
    elevation: 4,
  },
  fillContentAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  defaultFontSize: {
    fontSize: 64,
  },
})
