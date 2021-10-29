import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import IconProps from '../../types/react-native/iconProps';

const CloseModalIcon = (props: IconProps) => (
	<Svg
		viewBox="0 0 31.75 31.75"
		{...props}
	>
		<Circle cy={15.875} cx={15.875} r={15.875} fill="#858c8c" />
		<Circle cy={15.875} cx={15.875} r={13.229} fill="#eee5d7" />
		<Path
			d="M23.151 20.74l-2.412 2.411-4.864-4.864-4.864 4.864-2.412-2.412 4.864-4.864L8.6 11.011l2.412-2.412 4.864 4.864L20.739 8.6l2.412 2.412-4.864 4.864z"
			fill="#444d5d"
		/>
		<Path
			d="M8.599 23.151v-5.292l5.292 5.292zm0-14.552h5.292l-5.292 5.292zm14.552 14.552h-5.292l5.292-5.292zm0-14.552v5.292l-5.292-5.292z"
			fill="#444d5d"
		/>
	</Svg>
);

export default CloseModalIcon;
