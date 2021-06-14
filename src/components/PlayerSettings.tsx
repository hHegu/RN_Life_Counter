import ColorSelection from './ColorSelection'
import IconButton from './IconButton'
import Player from '../types/player'
import React from 'react'
import { StyleSheet } from 'react-native'
import { THEMES } from '../constants/colors'
import { View } from 'react-native-animatable'
import { editPlayer } from '../features/game/game'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from '../hooks'

type PlayerSettingsType = {
  player: Player
  rotation: number
  isVertical: boolean
  onClose: () => void
}

const PlayerSettings = ({
  player,
  onClose,
  rotation,
  isVertical,
}: PlayerSettingsType) => {
  const dispatch = useAppDispatch()

  return (
    <View style={[styles.container]}>
      <IconButton
        icon={faTimes}
        onPress={onClose}
        style={[
          styles.closeButton,
          { transform: [{ rotateZ: `${rotation}deg` }] },
        ]}
        color={player.color.mainColor}
      />
      <View
        style={[
          styles.colorSelections,
          { flexDirection: isVertical ? 'row' : 'column' },
        ]}>
        {Object.values(THEMES).map(color => (
          <ColorSelection
            key={color.secondaryColor.toString()}
            color={color}
            onPress={() => {
              dispatch(editPlayer({ ...player, color }))
              onClose()
            }}
            disabled={color === player.color}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 8,
  },
  colorSelections: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 8,
    margin: 8,
    flexWrap: 'wrap',
  },
})

export default PlayerSettings
