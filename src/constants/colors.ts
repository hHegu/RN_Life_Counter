import { rgbAsString } from "../util"

export type MTGColor = {
  mainColor: string
  secondaryColor: string
}

const MTG_COLORS =  {
  red: {
    secondaryColor: rgbAsString([235, 159, 130]),
    mainColor: rgbAsString([211, 32, 42]),
  },
  green: {
    secondaryColor: rgbAsString([196, 211, 202]),
    mainColor: rgbAsString([0, 115, 62]),
  },
  blue: {
    secondaryColor: rgbAsString([179, 206, 234]),
    mainColor: rgbAsString([14, 104, 171]),
  },
  black: {
    secondaryColor: rgbAsString([166, 159, 157]),
    mainColor: rgbAsString([21, 11, 0]),
  },
  white: {
    secondaryColor: rgbAsString([248, 231, 185]),
    mainColor: rgbAsString([249, 250, 244]),
  },
}

const COLORS = {
  default: {
    secondaryColor: rgbAsString([255, 255, 255]),
    mainColor: rgbAsString([0, 0, 0]),
  },
  defaultDark: {
    secondaryColor: '#212121',
    mainColor: '#ffffff',
  }
}

export default {...MTG_COLORS, ...COLORS}