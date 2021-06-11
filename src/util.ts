import { MTGColor } from './constants/colors'

export const getRotation = (playerId: number, numOfPlayers: number) => {
  if (numOfPlayers === 6) {
    return 90
  }
  if (numOfPlayers === 5) {
    switch (playerId) {
      case 0:
      case 1:
      case 2:
      case 3:
        return 90
      default:
        return 0
    }
  }

  if (numOfPlayers === 4) {
    return 90
  }

  if (numOfPlayers === 3) {
    switch (playerId) {
      case 0:
      case 1:
        return 90
      default:
        return 0
    }
  }

  return 0
}

export const getIsFlipped = (playerId: number, numOfPlayers: number) => {
  const rotation = getRotation(playerId, numOfPlayers)
  if (rotation === 90) {
    return playerId % 2 > 0
  }

  if (numOfPlayers === 2) {
    return playerId === 0
  }

  return false
}

export const getIsVertical = (playerId: number, numOfPlayers: number) => {
  if (numOfPlayers === 3) {
    return playerId === 2
  }
  if (numOfPlayers === 5) {
    return playerId === 4
  }
  return numOfPlayers <= 2
}

export const rgbAsString = (color: number[]) => `rgb(${color.join(',')})`
