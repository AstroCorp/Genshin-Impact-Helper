import React from 'react';
import { Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HomeProps from '../types/react-navigation/HomeProps';

const Home = (props: HomeProps) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text>Home :D</Text>
		</SafeAreaView>
	);
};

export default Home;
