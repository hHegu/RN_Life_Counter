import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { getIsFlipped, getIsVertical, getRotation } from '../../src/util'
import { useAppDispatch, useAppSelector } from '../../src/hooks'

import IconButton from '../../src/components/IconButton'
import LifeCounter from '../../src/components/LifeCounter'
import Overlay from '../../src/components/Overlay'
import Player from '../types/player'
import Settings from '../../src/components/Settings'
import colors from '../constants/colors'
import { editPlayer } from '../../src/features/game/game'
import { faCog } from '@fortawesome/free-solid-svg-icons'

export default function Main() {
  const dispatch = useAppDispatch()
  const { players, playerCount } = useAppSelector((state) => state.game)
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)

  return (
    <View style={styles.container}>
      {players.map((player, i) => (
        <LifeCounter
          key={`player_${player.id}`}
          player={player}
          rotation={getRotation(i, playerCount)}
          onChange={(newPlayer: Player) =>
            dispatch(editPlayer(newPlayer))
          }
          isVertical={getIsVertical(i, playerCount)}
          isFlipped={getIsFlipped(i, playerCount)}
        />
      ))}
      <IconButton
        icon={faCog}
        onPress={() => setIsSettingsVisible(true)}
        style={styles.settingsIcon}
        color={colors.defaultDark.mainColor}
        iconSize={32}
      />
      <Settings visible={isSettingsVisible} setVisible={setIsSettingsVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  settingsIcon: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 8,
  },
})
