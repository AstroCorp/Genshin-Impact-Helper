import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from '../../types/react-native/iconProps';

const CodesIcon = (props: IconProps) => (
	<Svg
		viewBox="0 0 512 512"
		{...props}
	>
		<Path
        	d="M124 223c-9 0-17 10-17 22 0 13 8 23 17 23 10 0 18-10 18-23 0-12-8-22-18-22zm152 119c-10 0-18 10-18 22 0 13 8 23 18 23 9 0 17-10 17-23 0-12-8-22-17-22z"
			fill="#ebe4d7"
		/>
		<Path
			d="M374 160C222 20 230 25 217 20c-17-6-37-3-51 10L25 160a77 77 0 0 0-25 57v229c0 27 22 49 49 49h301c27 0 49-22 49-49V217c0-22-9-43-25-57zm-189-49a15 15 0 1 1 30 2 15 15 0 0 1-30-2zM77 245c0-28 21-52 47-52s48 24 48 52-22 53-48 53-47-24-47-53zm86 160c-10 0-18-11-14-21l73-174a15 15 0 1 1 28 12l-73 174c-2 6-8 9-14 9zm113 12c-26 0-48-24-48-53s22-52 48-52 47 24 47 52-21 53-47 53z"
			fill="#ebe4d7"
		/>
		<Path 
			d="m508 324-76-222c-9-19-25-35-45-42L284 36l110 102c22 20 35 49 35 79v194l54-23c24-11 35-39 25-64z"
			fill="#7c7f86"
		/>
	</Svg>
);

export default CodesIcon;
