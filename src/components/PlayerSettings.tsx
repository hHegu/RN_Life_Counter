import { DEFAULT_THEMES, MTG_THEMES } from '../constants/colors'
import { setPrimaryColor, togglePlayerColor } from '../features/game/game'

import ColorSelection from './ColorSelection'
import IconButton from './IconButton'
import Overlay from './Overlay'
import Player from '../types/player'
import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native-animatable'
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

  const mtgColorSettings = (
    <View
      style={[
        styles.colorSelections,
        {
          flexDirection: isVertical ? 'row' : 'column',
          height: isVertical ? 'auto' : '100%',
          width: isVertical ? '100%' : 'auto',
        },
      ]}>
      {Object.values(MTG_THEMES).map(color => (
        <ColorSelection
          key={color.secondaryColor.toString()}
          color={color}
          onPress={() => {
            dispatch(togglePlayerColor({ playerId: player.id, color }))
          }}
          onLongPress={() => {
            dispatch(setPrimaryColor({ playerId: player.id, color }))
          }}
          selected={player.colors.includes(color)}
        />
      ))}
    </View>
  )

  const defaultColorSettings = (
    <View
      style={[
        styles.colorSelections,
        {
          flexDirection: isVertical ? 'row' : 'column',
          height: isVertical ? 'auto' : '100%',
          width: isVertical ? '100%' : 'auto',
        },
      ]}>
      {Object.values(DEFAULT_THEMES).map(color => (
        <ColorSelection
          key={color.secondaryColor.toString()}
          color={color}
          onPress={() => {
            dispatch(togglePlayerColor({ playerId: player.id, color }))
          }}
          onLongPress={() => {
            dispatch(setPrimaryColor({ playerId: player.id, color }))
          }}
          selected={player.colors.includes(color)}
        />
      ))}
    </View>
  )

  return (
    <View style={[styles.container]}>
      <Overlay onPress={onClose} visible={true} />
      <IconButton
        icon={faTimes}
        onPress={onClose}
        style={[
          styles.closeButton,
          { transform: [{ rotateZ: `${rotation}deg` }] },
        ]}
        color={player.colors[0].mainColor}
      />
      <View
        style={[
          styles.colorSelectionsContainer,
          {
            flexDirection: isVertical ? 'row' : 'column',
          },
        ]}>
        {isVertical ? (
          <>
            {defaultColorSettings}
            {mtgColorSettings}
          </>
        ) : (
          <>
            {mtgColorSettings}
            {defaultColorSettings}
          </>
        )}
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
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 8,
  },
  colorSelectionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  colorSelections: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
})

export default PlayerSettings
