// components/icons/BreadIcon.tsx
import React from "react";
import { Svg, G, Path } from "react-native-svg";

interface BreadProps {
  size?: number;
  color?: string;
}

const Bread: React.FC<BreadProps> = ({ size = 96, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <G transform="translate(0,96) scale(0.1,-0.1)" fill={color}>
      <Path
        d="M422 879 c-52 -9 -137 -35 -202 -63 -90 -38 -160 -117 -160 -181 0
        -28 23 -79 47 -107 12 -13 15 -47 14 -167 l-2 -150 28 -30 c24 -27 48 -36 170
        -67 l141 -37 163 53 c122 39 170 60 191 81 l28 27 0 145 c0 119 3 147 16 157
        37 32 57 104 42 158 -16 61 -53 99 -131 136 -110 53 -216 66 -345 45z m135
        -63 c38 -20 78 -63 100 -111 19 -42 46 -57 57 -30 7 19 -15 65 -57 118 l-29
        38 28 -6 c51 -12 154 -66 170 -90 38 -58 32 -119 -16 -170 -17 -18 -19 -38
        -21 -162 0 -89 -5 -148 -12 -157 -7 -9 -72 -36 -144 -60 l-133 -45 0 170 0
        169 30 41 c36 51 46 96 30 146 -18 55 -54 99 -108 130 l-47 28 30 5 c44 8 91
        3 122 -14z m-156 -51 c106 -54 140 -149 79 -218 l-30 -35 0 -189 0 -189 -124
        32 c-69 17 -129 35 -135 39 -7 4 -11 63 -11 168 l0 161 -32 33 c-71 73 -21
        168 112 213 56 19 79 16 141 -15z"
        fill={color}
        stroke={color}
        strokeWidth={32}
      />
    </G>
  </Svg>
);

export default Bread;
