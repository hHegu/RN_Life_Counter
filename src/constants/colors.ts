import { rgbAsString } from '../util'

export type MTGColor = {
  mainColor: string
  secondaryColor: string
}

const COLORS = {
  mountain: rgbAsString([211, 32, 42]),
  forest: rgbAsString([0, 115, 62]),
  island: rgbAsString([14, 104, 171]),
  swamp: rgbAsString([21, 11, 0]),
  plains: rgbAsString([249, 250, 244]),

  bgMountain: rgbAsString([235, 159, 130]),
  bgForest: rgbAsString([196, 211, 202]),
  bgIsland: rgbAsString([179, 206, 234]),
  bgSwamp: rgbAsString([166, 159, 157]),
  bgPlains: rgbAsString([248, 231, 185]),

  black: '#212121',
  white: '#ffffff',
}

const MTG_THEMES = {
  red: {
    secondaryColor: COLORS.bgMountain,
    mainColor: COLORS.mountain,
  },
  green: {
    secondaryColor: COLORS.bgForest,
    mainColor: COLORS.forest,
  },
  blue: {
    secondaryColor: COLORS.bgIsland,
    mainColor: COLORS.island,
  },
  black: {
    secondaryColor: COLORS.bgSwamp,
    mainColor: COLORS.swamp,
  },
  white: {
    secondaryColor: COLORS.bgPlains,
    mainColor: COLORS.black,
  },
}

const DEFAULT_THEMES = {
  default: {
    secondaryColor: COLORS.white,
    mainColor: COLORS.black,
  },
  defaultDark: {
    secondaryColor: COLORS.black,
    mainColor: COLORS.white,
  },
}

const THEMES = { ...MTG_THEMES, ...DEFAULT_THEMES }

export { THEMES, COLORS, DEFAULT_THEMES, MTG_THEMES }
