import * as React from 'react';
import Svg, {Defs, LinearGradient, Stop, Path} from 'react-native-svg';

const SVGComponent = props => (
  <Svg
    width="100%"
    height={2550}
    id="svg"
    viewBox="0 224.7277374267578 1440 475.27227783203125"
    xmlns="http://www.w3.org/2000/svg"
    className="transition duration-300 ease-in-out delay-150"
    {...props}>
    <Defs>
      <LinearGradient id="gradient" x1="62%" y1="1%" x2="38%" y2="99%">
        <Stop offset="15%" stopColor="#9999ff" />
        <Stop offset="20%" stopColor="#99b3ff" />
      </LinearGradient>
    </Defs>
    <Path
      d="M 0,700 C 0,700 0,350 0,350 C 141.06666666666666,271.6 282.1333333333333,193.2 436,228 C 589.8666666666667,262.8 756.5333333333333,410.79999999999995 926,450 C 1095.4666666666667,489.20000000000005 1267.7333333333333,419.6 1440,350 C 1440,350 1440,700 1440,700 Z"
      stroke="none"
      strokeWidth={0}
      fill="url(#gradient)"
      className="transition-all duration-300 ease-in-out delay-150 path-0"
      transform="rotate(-180 720 350)"
    />
  </Svg>
);

export default SVGComponent;
