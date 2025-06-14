// components/icons/ChickenLegIcon.tsx
import React from "react";
import { Svg, G, Path } from "react-native-svg";

interface ChickenlegProps {
  size?: number;
  color?: string;
}

const Chickenleg: React.FC<ChickenlegProps> = ({
  size = 96,
  color = "black",
}) => (
  <Svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <G transform="translate(0,96) scale(0.1,-0.1)" fill={color}>
      <Path
        d="M553 849 c-65 -25 -150 -101 -186 -166 -30 -57 -57 -158 -57 -221 0
        -24 -5 -53 -11 -65 -19 -37 -72 -87 -91 -87 -96 0 -151 -117 -79 -170 14 -11
        29 -23 33 -27 49 -56 59 -63 91 -63 19 0 46 9 60 20 29 23 51 80 42 108 -4 14
        6 29 34 55 40 36 56 42 184 71 87 20 138 47 199 104 132 124 152 304 44 399
        -74 65 -165 80 -263 42z m180 -43 c41 -16 81 -64 97 -112 25 -73 -15 -179 -95
        -253 -55 -51 -107 -75 -201 -95 -38 -8 -83 -20 -99 -26 -42 -16 -85 3 -85 39
        0 63 24 210 42 258 32 86 117 169 198 194 41 12 108 10 143 -5z m-399 -557
        c-31 -32 -35 -41 -29 -68 15 -71 -58 -112 -90 -51 -9 17 -27 35 -40 40 -19 7
        -25 17 -25 40 0 32 26 50 74 50 12 0 37 15 55 34 l34 35 28 -22 29 -21 -36
        -37z"
        fill={color}
        stroke={color}
        strokeWidth={32}
      />
    </G>
  </Svg>
);

export default Chickenleg;
