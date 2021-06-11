import * as Animatable from 'react-native-animatable'

import {
  faDiceSix,
  faHeart,
  faSyncAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import {
  randomizeFirstPlayer,
  resetGame,
  togglePlayerCount,
  toggleStartingLife,
} from '../features/game/game'
import { useAppDispatch, useAppSelector } from '../hooks'

import IconButton from './IconButton'
import Overlay from '../../src/components/Overlay'
import React from 'react'
import { StyleSheet } from 'react-native'

const Settings = ({
  visible,
  setVisible,
}: {
  visible: boolean
  setVisible: (visible: boolean) => void
}) => {
  const { startingLife, playerCount } = useAppSelector((state) => state.game)
  const dispatch = useAppDispatch()
  return (
    <>
      <Overlay onPress={() => setVisible(false)} visible={visible} />
      {
        <Animatable.View
          style={styles.container}
          animation={visible ? 'flipInX' : 'flipOutX'}
          duration={250}
        >
          <IconButton
            onPress={() => dispatch(toggleStartingLife())}
            icon={faHeart}
            color="white"
            text={startingLife.toString()}
            fontSize={24}
            iconSize={16}
          />
          <IconButton
            onPress={() => dispatch(togglePlayerCount())}
            icon={faUser}
            color="white"
            text={playerCount.toString()}
            fontSize={24}
            iconSize={16}
          />
          <IconButton
            onPress={() => {
              dispatch(resetGame())
              setVisible(false)
            }}
            icon={faSyncAlt}
            color="white"
            iconSize={24}
          />
          <IconButton
            onPress={() => {
              dispatch(randomizeFirstPlayer())
              setVisible(false)
            }}
            icon={faDiceSix}
            color="white"
            iconSize={24}
          />
        </Animatable.View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '70%',
    justifyContent: 'space-around',
  },
})

export default Settings
