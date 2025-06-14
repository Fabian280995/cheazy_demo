// components/icons/AvocadoIcon.tsx
import React from "react";
import { Svg, Path } from "react-native-svg";

interface AvocadoProps {
  size?: number;
  color?: string;
}

const Avocado: React.FC<AvocadoProps> = ({ size = 24, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 960 960" fill="none">
    <Path
      d="M465 47c47 24 103 83 137 142 17 29 59 85 94 125 72 80 107 145 122 226 47 258-211 440-454 320-137-67-206-209-190-390 4-41 9-118 12-170 8-147 33-205 105-249 42-26 130-28 174-4zM309 97c-56 33-66 76-74 303-6 196-6 208 16 264 60 162 252 233 401 149 78-44 112-103 117-204 3-70 0-85-26-141-17-36-58-93-95-134-36-39-80-100-99-134-56-106-160-150-240-103z"
      fill={color}
      stroke={color}
      strokeWidth={32}
    />
    <Path
      d="M542 379c53 34 91 85 114 154 64 193-196 278-285 94-36-75-21-198 31-254 31-33 83-30 140 6zM413 447c-44 108 17 233 115 233 42 0 92-46 92-85 0-63-70-162-135-190-36-16-51-7-72 42z"
      fill={color}
      stroke={color}
      strokeWidth={32}
    />
  </Svg>
);

export default Avocado;
