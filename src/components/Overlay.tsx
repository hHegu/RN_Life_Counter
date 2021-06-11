import * as Animatable from 'react-native-animatable'

import React, { useEffect, useState } from 'react'

import { TouchableWithoutFeedback } from 'react-native'

const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 0.4,
  },
}

const fadeOut = {
  from: {
    opacity: 0.4,
  },
  to: {
    opacity: 0,
  },
}

const Overlay = ({
  onPress,
  visible,
}: {
  onPress: () => void
  visible: boolean
}) => {
  const [isRendered, setIsRendered] = useState(visible)

  useEffect(() => {
    if (visible) {
      setIsRendered(visible)
    }
  }, [visible])

  if (!isRendered) {
    return null
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animatable.View
        animation={visible ? fadeIn : fadeOut}
        onAnimationEnd={() => {
          if (!visible) {
            setIsRendered(false)
          }
        }}
        duration={150}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: 'black',
        }}
      />
    </TouchableWithoutFeedback>
  )
}

export default Overlay
