import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import React from 'react'

type IconButtonType = {
  icon: IconProp
  onPress: () => void
  iconSize?: number
  fontSize?: number
  color?: string
  text?: string
  style?: StyleProp<ViewStyle>
}

const IconButton = ({
  icon,
  onPress,
  text,
  color = 'black',
  style = {},
  iconSize = 24,
  fontSize = iconSize,
}: IconButtonType) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {text && <Text style={{ color, fontSize }}>{text}</Text>}
      <FontAwesomeIcon
        size={iconSize}
        icon={icon}
        color={color}
        style={{ marginLeft: text ? 8 : 0 }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
export default IconButton
