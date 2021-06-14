import * as Animatable from 'react-native-animatable'

import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks'

import { COLORS } from '../constants/colors'
import { setFirstPlayer } from '../features/game/game'

const FirstPlayerNotification = ({
  isVertical,
  rotation,
  playerId,
}: {
  isVertical: boolean
  rotation: number
  playerId: number
}) => {
  const [renderMe, setRenderMe] = useState(false)
  const firstPlayerId = useAppSelector(state => state.game.firstPlayerId)
  const dispatch = useAppDispatch()

  const isFirstPlayer = firstPlayerId === playerId

  const timer = useRef(setTimeout(() => {}, 0))

  useEffect(() => {
    clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      firstPlayerId === playerId && dispatch(setFirstPlayer(null))
    }, 2500)

    firstPlayerId !== null && setRenderMe(isFirstPlayer)

    return () => clearTimeout(timer.current)
  }, [firstPlayerId])

  return renderMe ? (
    <Animatable.View
      animation={isFirstPlayer ? 'tada' : 'fadeOut'}
      pointerEvents="box-none"
      onAnimationEnd={() => {
        setRenderMe(isFirstPlayer)
      }}
      style={[
        styles.firstPlayerContainer,
        { top: isVertical ? 120 : 0, right: !isVertical ? 120 : 0 },
      ]}>
      <Text
        style={[
          {
            transform: [{ rotateZ: `${rotation}deg` }],
            fontWeight: 'bold',
            fontSize: 16,
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderRadius: 100,
            width: 120,
            textAlign: 'center',
            backgroundColor: COLORS.black,
            color: COLORS.white,
            borderWidth: 2,
          },
        ]}>
        You go first!
      </Text>
    </Animatable.View>
  ) : null
}

const styles = StyleSheet.create({
  firstPlayerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FirstPlayerNotification
