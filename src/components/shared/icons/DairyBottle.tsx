import React from "react";
import { Svg, G, Path } from "react-native-svg";

interface DairyBottleProps {
  size?: number;
  color?: string;
}

const DairyBottle: React.FC<DairyBottleProps> = ({
  size = 96,
  color = "black",
}) => (
  <Svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <G transform="translate(0,96) scale(0.1,-0.1)" fill={color}>
      <Path
        d="M375 924 c-11 -3 -26 -13 -32 -22 -15 -19 -17 -118 -3 -127 17 -10
        12 -34 -25 -115 l-35 -78 0 -240 c0 -240 0 -241 24 -269 24 -28 24 -28 169
        -31 160 -4 199 6 217 54 6 14 10 127 10 252 l0 227 -31 65 c-45 94 -51 119
        -34 137 19 19 20 103 1 128 -12 17 -28 20 -128 22 -62 1 -122 -1 -133 -3z
        m220 -79 l0 -26 -108 -2 -107 -2 0 26 c0 14 2 28 5 30 2 3 51 4 107 3 l103 -2
        0 -27z m-13 -122 c4 -23 21 -68 37 -100 l31 -58 0 -218 c0 -131 -4 -226 -10
        -238 -10 -17 -22 -19 -148 -19 -94 0 -142 4 -150 12 -9 9 -12 77 -12 244 l0
        232 30 64 c17 34 33 78 36 96 l6 33 86 -3 86 -3 8 -42z"
      />
    </G>
  </Svg>
);

export default DairyBottle;
