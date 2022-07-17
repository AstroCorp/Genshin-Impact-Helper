import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import IconProps from '../../types/react-native/iconProps';

const GoBackModalIcon = (props: IconProps) => (
	<Svg
		viewBox="0 0 31.8 31.8"
		{...props}
	>
		<Circle
			cy={15.9}
			cx={15.9}
			r={15.9}
			fill="#858c8c"
		/>
		<Circle
			cy={15.9}
			cx={15.9}
			r={13.2}
			fill="#eee5d7"
		/>
		<Path
			y={-1}
			d="m16 23-9-7 9-7v4a9 9 0 0 1 9 10c-1-3-4-4-7-4h-2z"
			fill="#444d5d"
		/>
	</Svg>
);

export default GoBackModalIcon;
