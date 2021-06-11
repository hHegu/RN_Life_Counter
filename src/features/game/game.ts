import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Appearance } from 'react-native'
import Player from '../../types/player'
import colors from '../../constants/colors'

const usingLightTheme = Appearance.getColorScheme() === 'light'

const getPlayers = ({
  life = 20,
  playerCount = 4,
}: {
  life?: number
  playerCount?: number
} = {}) => {
  const players: Player[] = new Array(playerCount)
    .fill(null)
    .map((_val, id) => ({
      id,
      life,
      color: usingLightTheme ? colors.default : colors.defaultDark,
    }))
  return players
}

const getDefaultPlayer = (life: number, id: number) => ({
  life,
  color: usingLightTheme ? colors.default : colors.defaultDark,
  id,
})

type GameState = {
  players: Player[]
  startingLife: number
  playerCount: number
  firstPlayerId: number | null
}

const initialState: GameState = {
  players: getPlayers(),
  startingLife: 20,
  playerCount: 4,
  firstPlayerId: null,
}

const MAX_PLAYER_COUNT = 6
const MIN_PLAYER_COUNT = 2

const MAX_STARTING_LIFE_TOTAL = 40
const MIN_STARTING_LIFE_TOTAL = 20
const STARTING_LIFE_STEP = 10

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    editPlayer: (state, action: PayloadAction<Player>) => {
      const player = action.payload
      state.players[player.id] = player
    },
    resetGame: state => {
      state.players = state.players.map(player => ({
        ...player,
        life: state.startingLife,
      }))
    },
    toggleStartingLife: state => {
      const { startingLife } = state
      const newStartingLife =
        startingLife < MAX_STARTING_LIFE_TOTAL
          ? startingLife + STARTING_LIFE_STEP
          : MIN_STARTING_LIFE_TOTAL

      state.startingLife = newStartingLife
      state.players = state.players.map(player => ({
        ...player,
        life: state.startingLife,
      }))
    },
    togglePlayerCount: state => {
      const { playerCount, startingLife } = state
      const newPlayerCount =
        playerCount < MAX_PLAYER_COUNT ? playerCount + 1 : MIN_PLAYER_COUNT
      state.playerCount = newPlayerCount
      if (newPlayerCount !== 2) {
        state.players.push(getDefaultPlayer(startingLife, newPlayerCount - 1))
      } else {
        state.players = state.players.slice(0, 2)
      }
    },
    randomizeFirstPlayer: state => {
      state.firstPlayerId = Math.floor(Math.random() * state.playerCount)
    },
    setFirstPlayer: (state, action: PayloadAction<number | null>) => {
      state.firstPlayerId = action.payload
    },
  },
})

export const {
  editPlayer,
  resetGame,
  togglePlayerCount,
  toggleStartingLife,
  randomizeFirstPlayer,
  setFirstPlayer,
} = gameSlice.actions

export default gameSlice.reducer
