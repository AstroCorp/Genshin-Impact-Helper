import React from 'react';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import tailwind from '../utils/tailwind';

const ContentView = ({ children, ...otherProps }: SafeAreaViewProps) => (
	<SafeAreaView
		style={tailwind('bg-screen-background flex-1')}
		{...otherProps}
	>
		{children}
	</SafeAreaView>
);

export default ContentView;
