import * as Animatable from 'react-native-animatable'

import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text } from 'react-native'

import Player from '../types/player'
import commonStyles from '../common/commonStyles'

type LifeChangePopupType = {
  rotation: number
  isVertical: boolean
  player: Player
}

const LifeChangePopup = ({
  player,
  rotation,
  isVertical,
}: LifeChangePopupType) => {
  const { life, color } = player
  const [lifeChange, setLifeChange] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [comparedLife, setComparedLife] = useState(life)
  const timer = useRef(setTimeout(() => {}, 0))
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    setLifeChange(life - comparedLife)
    setIsVisible(true)

    return () => clearTimeout(timer.current)
  }, [life])

  const reset = () => {
    setLifeChange(0)
    setComparedLife(life)
  }

  return (
    <Animatable.View
      style={[
        styles.container,
        { bottom: isVertical ? 80 : 0, left: !isVertical ? 80 : 0 },
      ]}
      animation={isVisible ? 'zoomIn' : 'zoomOut'}
      onAnimationEnd={() => !isVisible && reset()}
      duration={200}
      pointerEvents="box-none">
      <Text
        style={[
          {
            transform: [{ rotateZ: `${rotation}deg` }],
            fontWeight: 'bold',
            fontSize: 16,
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderRadius: 100,
            textAlign: 'center',
            color: color.mainColor,
          },
          commonStyles.textShadow,
        ]}>
        {`${lifeChange > 0 ? '+' : ''}${lifeChange}`}
      </Text>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default LifeChangePopup
