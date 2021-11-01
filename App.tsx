import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { WishCounterScreen } from './src/screens';

const store = configureStore();
const Drawer = createDrawerNavigator();

const App = () => {
	useEffect(() => SplashScreen.hide());

	return (
		<SafeAreaProvider>
			<Provider store={store.store}>
				<PersistGate loading={null} persistor={store.persistor}>
					<NavigationContainer>
						<Drawer.Navigator 
							initialRouteName="WishCounterScreen"
							screenOptions={{
								headerShown: false,
							}}
						>
							<Drawer.Screen name="WishCounterScreen" component={WishCounterScreen} />
						</Drawer.Navigator>
					</NavigationContainer>
				</PersistGate>
			</Provider>
		</SafeAreaProvider>
	);
}

export default App;
