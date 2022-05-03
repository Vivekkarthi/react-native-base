import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#002060',
  secondary: '#f17012',
  black: '#322F3B',
  white: '#FFFFFF',
  lightGray: '#EFEEEF',
  transparent: 'transparent',
  background: '#dfe1eb',
  messageColor1: '#0DA728',
  messageColor2: '#D83F50',
  messageColor3: '#f4d837',
  messageColor4: '#8a5235',

  batter0: '#f3432e',
  batter20: '#fd2200',
  batter40: '#f09f39',
  batter60: '#efc81b',
  batter80: '#16e764',
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
