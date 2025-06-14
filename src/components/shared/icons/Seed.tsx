// components/icons/PlantProteinIcon.tsx
import React from "react";
import { Svg, G, Path } from "react-native-svg";

interface SeedProps {
  size?: number;
  color?: string;
}

const Seed: React.FC<SeedProps> = ({ size = 96, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <G transform="translate(0,96) scale(0.1,-0.1)" fill={color}>
      <Path
        d="M520 893 c-65 -32 -196 -154 -256 -239 -24 -34 -58 -92 -76 -130 -30
        -63 -33 -77 -33 -164 0 -80 4 -103 24 -144 67 -135 204 -190 352 -141 112 37
        214 177 239 327 36 210 -68 518 -174 518 -12 0 -46 -12 -76 -27z m113 -53 c32
        -38 65 -124 83 -220 35 -180 -6 -342 -111 -439 -60 -55 -100 -71 -177 -71
        -106 0 -181 55 -216 159 -18 53 -14 144 9 205 47 126 194 304 302 366 65 37
        79 37 110 0z"
        fill={color}
        stroke={color}
        strokeWidth={32}
      />
      <Path
        d="M423 545 c-81 -73 -118 -146 -117 -231 1 -100 52 -164 114 -142 42
        14 108 75 133 122 28 53 28 165 1 246 -27 78 -50 79 -131 5z m100 -88 c8 -50
        8 -75 -2 -106 -14 -47 -61 -105 -102 -127 -27 -14 -29 -13 -44 15 -23 45 -21
        129 3 178 25 48 111 128 124 115 5 -5 14 -39 21 -75z"
        fill={color}
        stroke={color}
        strokeWidth={32}
      />
    </G>
  </Svg>
);

export default Seed;
