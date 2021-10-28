import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/home';

const store = configureStore();
const Stack = createStackNavigator();

const App = () => {
	const [isConnected, setIsConnected] = useState(true);

	useEffect(() => {
		SplashScreen.hide();
		toggleInternetStatus();

		return () => toggleInternetStatus();
	});

	const toggleInternetStatus = () => {
		NetInfo.addEventListener((state) => setIsConnected(state.isConnected));
	};

	return (
		<SafeAreaProvider>
			<Provider store={store.store}>
				<PersistGate loading={null} persistor={store.persistor}>
					<NavigationContainer>
						<Stack.Navigator 
							screenOptions={{ 
								headerShown: false,
							}}
						>
							<Stack.Screen name="Home" component={Home} />
						</Stack.Navigator>
					</NavigationContainer>

					{!isConnected && (
						<View style={styles.bg}>
							<Text style={styles.text}>Sin conexión</Text>
						</View>
					)}
				</PersistGate>
			</Provider>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	bg: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.1)',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},

	text: {
		color: '#E51212',
		marginBottom: 35,
	},
});

export default App;
