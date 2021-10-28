import React from 'react';
import { Text } from 'react-native';
import Header from '../components/Header';
import LottieView from 'lottie-react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HomeProps from '../types/react-navigation/HomeProps';

const Home = (props: HomeProps) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header title="Home" navigation={props.navigation} />
			<LottieView
				source={require('../assets/lottie/party-penguin.json')}
				autoPlay
				loop
				style={{ width: 250, height: 250 }}
			/>
			<Text>Home :D</Text>
		</SafeAreaView>
	);
};

export default Home;
