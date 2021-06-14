import * as Animatable from 'react-native-animatable'

import { StyleSheet, TouchableOpacity } from 'react-native'

import { MTGColor } from '../constants/colors'
import React from 'react'
import { View } from 'react-native-animatable'
import commonStyles from '../common/commonStyles'

const ColorSelection = ({
  color,
  selected,
  onPress,
  onLongPress,
}: {
  color: MTGColor
  selected: boolean
  onPress: () => void
  onLongPress: () => void
}) => (
  <TouchableOpacity
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.container}>
    <Animatable.View
      animation="zoomIn"
      duration={200}
      style={[
        styles.upper,
        commonStyles.shadow,
        {
          backgroundColor: color.secondaryColor,
          opacity: selected ? 0.7 : 1,
          borderWidth: selected ? 4 : StyleSheet.hairlineWidth,
          borderColor: color.mainColor,
        },
      ]}>
      <View style={[styles.lower, { backgroundColor: color.mainColor }]} />
    </Animatable.View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  upper: {
    borderWidth: StyleSheet.hairlineWidth,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  lower: {
    width: 16,
    height: 16,
    padding: 8,
    borderRadius: 50,
  },
})

export default ColorSelection
