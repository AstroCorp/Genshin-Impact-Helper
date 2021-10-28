import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Tutorial from './src/screens/Tutorial';
import Home from './src/screens/Home';
import Settings from './src/screens/Settings';

const store = configureStore();
const Drawer = createDrawerNavigator();
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

	const drawer = () => {
		return (
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Drawer.Screen
					name="Settings"
					component={Settings}
					options={{ headerShown: false }}
				/>
			</Drawer.Navigator>
		);
	};

	return (
		<SafeAreaProvider>
			<Provider store={store.store}>
				<PersistGate loading={null} persistor={store.persistor}>
					<StatusBar backgroundColor="#1775C2" />

					<NavigationContainer>
						<Stack.Navigator initialRouteName="Tutorial">
							<Stack.Screen
								name="Tutorial"
								component={Tutorial}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Home"
								component={drawer}
								options={{ headerShown: false }}
							/>
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
