import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from '../../types/react-native/iconProps';

const CloseIcon = (props: IconProps) => (
	<Svg
		viewBox="0 0 255 255"
		{...props}
	>
      <Path fill="#D6C3B2" d="M250.222 227.155L150.568 127.5l99.654-99.654c6.37-6.37 6.37-16.698 0-23.067-6.37-6.37-16.698-6.37-23.069 0L127.5 104.432 27.846 4.778c-6.37-6.37-16.698-6.37-23.068 0-6.37 6.37-6.37 16.697 0 23.068l99.654 99.654-99.654 99.655c-6.37 6.37-6.37 16.698 0 23.068A16.26 16.26 0 0016.31 255a16.26 16.26 0 0011.535-4.777l99.654-99.655 99.654 99.655A16.26 16.26 0 00238.69 255c4.175 0 8.35-1.592 11.533-4.777 6.37-6.37 6.37-16.698 0-23.068z" />
	</Svg>
);

export default CloseIcon;