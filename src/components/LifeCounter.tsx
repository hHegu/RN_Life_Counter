import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import FirstPlayerNotification from './FirstPlayerNotification'
import LifeButton from './LifeButton'
import LifeChangePopup from './LifeChangePopup'
import Player from '../types/player'
import PlayerSettings from './PlayerSettings'
import commonStyles from '../common/commonStyles'
import { useAppSelector } from '../hooks'

const LifeCounter = ({
  player,
  rotation,
  isVertical = false,
  isFlipped = false,
  onChange,
}: {
  player: Player
  rotation: number
  isVertical: boolean
  isFlipped: boolean
  onChange: (player: Player) => void
}) => {
  const playerCount = useAppSelector(state => state.game.playerCount)
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)

  const height = playerCount > 4 ? '33.3%' : '50%'

  const { life, color } = player
  const { mainColor, secondaryColor } = color

  const lifeCounter = (
    <>
      <LifeButton
        onPress={() => onChange({ ...player, life: life - 1 })}
        icon="-"
        rotation={rotation}
        color={mainColor}
      />
      <TouchableOpacity onPress={() => setIsSettingsVisible(true)}>
        <Text
          style={[
            {
              transform: [{ rotateZ: `${rotation}deg` }],
              color: mainColor,
            },
            commonStyles.textShadow,
            commonStyles.defaultFontSize,
          ]}>
          {life}
        </Text>
      </TouchableOpacity>
      <LifeButton
        onPress={() => onChange({ ...player, life: life + 1 })}
        icon="+"
        rotation={rotation}
        color={mainColor}
      />
    </>
  )

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isVertical ? 'row' : 'column',
          flexBasis: isVertical ? '100%' : '50%',
          height,
          transform: [{ rotateZ: isFlipped ? '180deg' : '0deg' }],
          backgroundColor: secondaryColor,
        },
      ]}>
      {isSettingsVisible ? (
        <PlayerSettings
          player={player}
          rotation={rotation}
          isVertical={isVertical}
          onClose={() => setIsSettingsVisible(false)}
        />
      ) : (
        lifeCounter
      )}
      <FirstPlayerNotification
        rotation={rotation}
        isVertical={isVertical}
        playerId={player.id}
      />
      <LifeChangePopup
        rotation={rotation}
        isVertical={isVertical}
        player={player}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '50%',
    borderWidth: 1,
    borderRadius: 8,
  },
})

export default LifeCounter
