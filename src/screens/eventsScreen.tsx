import React from 'react';
import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from '../utils/tailwind';
import { EventsProps } from '../types';

const EventsScreen = (props: EventsProps) => {
	return (
		<SafeAreaView style={tailwind`bg-screen-background flex-1`}>
			<ScrollView>
				<Text style={tailwind`p-2`}>In progress...</Text>
			</ScrollView>
		</SafeAreaView>
	);
}

export default EventsScreen;
