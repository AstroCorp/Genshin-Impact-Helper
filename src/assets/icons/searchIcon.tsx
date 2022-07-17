import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from '../../types/react-native/iconProps';

const SettingsIcon = (props: IconProps) => (
	<Svg
		viewBox="0 0 512 512"
		{...props}
	>
		<Path
			d="M506 476 360 330a203 203 0 1 0-30 30l146 146a21 21 0 0 0 30 0c8-9 8-22 0-30zM203 363a160 160 0 1 1 0-321 160 160 0 0 1 0 321z"
			fill="#7c7f86"
		/>
	</Svg>
);

export default SettingsIcon;
