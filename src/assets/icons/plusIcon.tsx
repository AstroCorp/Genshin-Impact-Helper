import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from '../../types/react-native/iconProps';

const PlusIcon = (props: IconProps) => (
  <Svg viewBox="0 0 512 512" {...props}>
    <Path fill={props.color} d="M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z" />
  </Svg>
);

export default PlusIcon;
