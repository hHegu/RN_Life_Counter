import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '../constants/colors'
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

  const isSmall = playerCount === 6 || (playerCount === 5 && player.id !== 4)

  const height = playerCount > 4 ? '33.3%' : '50%'

  const { life, colors } = player
  const { mainColor, secondaryColor } = colors[0]

  const lifeCounter = (
    <>
      <LifeButton
        onPress={() => onChange({ ...player, life: life - 1 })}
        icon="-"
        rotation={rotation}
        color={mainColor}
        isSmall={isSmall}
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
        isSmall={isSmall}
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
      <View
        style={[
          commonStyles.fillContentAbsolute,
          {
            transform: [{ rotateZ: '65deg' }],
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View
          style={{
            width: isVertical ? '250%' : '250%',
            height: isVertical ? '150%' : '120%',
          }}>
          {colors.map(color => (
            <View
              key={`bg-${player.id}${color.mainColor}${color.secondaryColor}`}
              style={{
                backgroundColor: color.secondaryColor,
                flex: 1,
                width: '100%',
                height: '100%',
              }}
            />
          ))}
        </View>
      </View>
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
    backgroundColor: COLORS.white,
    borderStyle: 'solid',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '50%',
    borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
})

export default LifeCounter
