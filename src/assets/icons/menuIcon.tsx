import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from '../../types/react-native/iconProps';

const MenuIcon = (props: IconProps) => (
	<Svg 
        viewBox="0 0 24 24"
        {...props}
    >
		<Path
			d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
			fill={props.color}
		/>
	</Svg>
);

export default MenuIcon;