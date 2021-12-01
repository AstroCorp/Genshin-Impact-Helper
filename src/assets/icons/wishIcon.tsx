import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from '../../types/react-native/iconProps';

const WishIcon = (props: IconProps) => (
	<Svg
		viewBox="0 0 100 100"
		{...props}
	>
      <Path
        d="M21.177 29.06l-.87 3-1.1-3.31a10.29 10.29 0 00-6.25-6.45l-3.3-1.18 2.94-.9a10.29 10.29 0 006.77-6.59l1-3 .79 2.73a10.31 10.31 0 007.22 7.06l2.7.72-3 .95a10.3 10.3 0 00-6.9 6.97z"
        fill="#a3a5a5"
      />
      <Path
        d="M76.005 85.46l-1.518 5.233-1.919-5.774a17.95 17.95 0 00-10.903-11.251l-5.756-2.059 5.128-1.57a17.95 17.95 0 0011.81-11.496l1.745-5.233 1.378 4.762a17.985 17.985 0 0012.594 12.316l4.71 1.256-5.233 1.657A17.968 17.968 0 0076.005 85.46z"
        fill="#7c7f86"
      />
      <Path
        d="M53.532 83.646l-3.794 13.083-4.797-14.435a44.875 44.875 0 00-27.257-28.13L3.293 49.02l12.821-3.925a44.875 44.875 0 0029.525-28.74L50 3.271l3.445 11.906a44.963 44.963 0 0031.487 30.789l11.775 3.14-13.083 4.143a44.92 44.92 0 00-30.092 30.397z"
        fill="#ebe4d7"
      />
	</Svg>
);

export default WishIcon;