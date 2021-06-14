import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import React from 'react'
import commonStyles from '../common/commonStyles'

type LifeButtonType = {
  icon: string
  rotation: number
  color: string
  onPress: () => void
  isSmall?: boolean
}

const LifeButton = ({
  icon,
  rotation,
  onPress,
  color,
  isSmall,
}: LifeButtonType) => {
  const fontSize = icon === '+' ? 64 : 80
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          transform: [{ rotateZ: `${rotation}deg` }],
        },
      ]}>
      <Text
        style={[
          {
            color,
            fontSize: isSmall ? fontSize * 0.7 : fontSize,
            marginBottom: icon === '+' ? 0 : 8,
          },
          commonStyles.textShadow,
        ]}>
        {icon}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    flex: 1,
  },
})

export default LifeButton
