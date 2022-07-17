import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import tailwind from '../utils/tailwind';

const FastImageWrapper = ({ url, style }: any) => {
	const [error, setError] = useState(url.length === 0);

	return (
		<>
			{!error ? (
				<FastImage
					source={
						typeof url === 'string'
							? {
									uri: url,
									priority: FastImage.priority.normal,
							  }
							: url
					}
					style={style}
					onError={() => setError(true)}
				/>
			) : (
				<View style={[tailwind('bg-gray-200'), style]} />
			)}
		</>
	);
};

export default FastImageWrapper;
