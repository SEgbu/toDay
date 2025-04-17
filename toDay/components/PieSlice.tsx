import React from 'react';
import { ColorValue, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type PieSliceProps = {
    size: number, 
    color: ColorValue, 
    percentage: number
}

export const PieSlice = ({ size, color, percentage } : PieSliceProps) => {
  const radius = size / 2;
  const angle = (percentage == 100 ? 99.9999 : percentage) * 3.6; // Convert percentage to degrees
  const radians = (Math.PI * (angle - 90)) / 180;
  
  const path = `M ${radius} ${radius}
                L ${radius} 0
                A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 
                ${radius + radius * Math.cos(radians)} ${radius + radius * Math.sin(radians)}
                Z`;

  return (
    <Svg width={size} height={size}>
      <Path d={path} fill={color} />
    </Svg>
  );
};

