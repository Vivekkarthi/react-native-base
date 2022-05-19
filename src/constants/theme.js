import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#002060',
  secondary: '#f17012',
  black: '#322F3B',
  white: '#FFFFFF',
  lightGray: '#EFEEEF',
  gray: '#6d757a',
  transparent: 'transparent',
  background: '#dfe1eb',
  messageColor1: '#99ccff',
  messageColor2: '#bbff33',
  messageColor3: '#85adad',
  messageColor4: '#cc9966',

  batter0: '#f3432e',

  batter10: '#fd2200',
  batter20: '#fd2200',

  batter30: '#f09f39',
  batter40: '#f09f39',

  batter50: '#efc81b',
  batter60: '#efc81b',

  batter70: '#16e764',
  batter80: '#16e764',

  batter90: '#00fd60',
  batter100: '#00fd60',
};

export const SIZES = {
  base: 10,
  radius: 20,
  width,
  height,
};

const theme = {COLORS, SIZES};
export default theme;
