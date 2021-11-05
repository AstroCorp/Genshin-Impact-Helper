import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerHeaderProps } from '@react-navigation/drawer';
import { WishCounterScreen, SettingsScreen } from './src/screens';
import { Header } from './src/components';

const store = configureStore();
const Drawer = createDrawerNavigator();

const App = () => {
	useEffect(() => SplashScreen.hide());

	return (
		<SafeAreaProvider>
			<StatusBar 
				animated={true} 
				backgroundColor="#454C5C"
				barStyle="light-content"
			/>

			<Provider store={store.store}>
				<PersistGate loading={null} persistor={store.persistor}>
					<NavigationContainer>
						<Drawer.Navigator 
							initialRouteName="WishCounterScreen"
						>
							<Drawer.Screen 
								name="WishCounterScreen"
								options={{
									title: 'Wish Counter',
									header: (props: DrawerHeaderProps) => (
										<Header {...props} title="Wish Counter" />
									),
								}}
								component={WishCounterScreen}
							/>

							<Drawer.Screen 
								name="SettingsScreen"
								options={{
									title: 'Settings',
									header: (props: DrawerHeaderProps) => (
										<Header {...props} title="Settings" />
									),
								}}
								component={SettingsScreen}
							/>
						</Drawer.Navigator>
					</NavigationContainer>
				</PersistGate>
			</Provider>
		</SafeAreaProvider>
	);
}

export default App;
