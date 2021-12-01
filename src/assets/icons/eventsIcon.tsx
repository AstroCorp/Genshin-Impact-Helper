import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from '../../types/react-native/iconProps';

const EventsIcon = (props: IconProps) => (
	<Svg
		viewBox="0 0 512 512"
		{...props}
	>
    <Path
      d="M469.725 61.064V442.59c0 12.393-10.047 22.439-22.44 22.439H56.366V512h428.495c12.394 0 22.44-10.046 22.44-22.439V61.064z"
      fill="#7e8287"
    />
    <Path
      d="M27.138 0C14.745 0 4.698 10.047 4.698 22.441v428.495h428.494c12.394 0 22.441-10.047 22.441-22.44V0zm67.746 50.104h270.562a24.997 24.997 0 0125.052 25.052 24.997 24.997 0 01-25.052 25.052H94.884a24.997 24.997 0 01-25.052-25.052 24.997 24.997 0 0125.052-25.052zm135.283 100.208l7.392 25.541a96.467 96.467 0 0067.55 66.061l25.264 6.737-28.068 8.887a96.376 96.376 0 00-64.558 65.218l-8.142 28.068-10.292-30.97a96.279 96.279 0 00-58.483-60.347l-30.873-11.044 27.505-8.422a96.279 96.279 0 0063.346-61.661zm97.493 135.96l3.696 12.772a48.233 48.233 0 0033.775 33.03l12.631 3.368-14.033 4.443a48.188 48.188 0 00-32.28 32.609l-4.07 14.035-5.146-15.486a48.14 48.14 0 00-29.24-30.174l-15.439-5.52 13.754-4.21a48.14 48.14 0 0031.673-30.832z"
      fill="#ece5d7"
    />
	</Svg>
);

export default EventsIcon;