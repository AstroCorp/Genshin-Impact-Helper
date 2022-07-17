import React from 'react';
import { Text, ScrollView } from 'react-native';
import tailwind from '../utils/tailwind';
import { EventsProps } from '../types';
import { ContentView } from '../components';

const EventsScreen = (props: EventsProps) => {
	return (
		<ContentView>
			<ScrollView>
				<Text style={tailwind('p-2 font-genshin')}>In progress...</Text>
			</ScrollView>
		</ContentView>
	);
};

export default EventsScreen;
