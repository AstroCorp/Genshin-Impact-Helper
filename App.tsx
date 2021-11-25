import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerHeaderProps } from '@react-navigation/drawer';
import { WishCounterScreen, SettingsScreen, EventsScreen } from './src/screens';
import { Header, Drawer } from './src/components';
import { SettingsIcon, EventsIcon, WishIcon } from './src/assets/icons';

const store = configureStore();
const DrawerController = createDrawerNavigator();

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
						<DrawerController.Navigator 
							initialRouteName="WishCounterScreen"
							drawerContent={(props: DrawerContentComponentProps) => (
								<Drawer {...props} />
							)}
							screenOptions={{
								header: (props: DrawerHeaderProps) => (
									<Header {...props} />
								),
							}}
						>
							<DrawerController.Screen 
								name="WishCounterScreen"
								options={{
									title: 'Wish Counter',
									drawerIcon: () => (
										<WishIcon height={25} width={25} />
									),
								}}
								component={WishCounterScreen}
							/>

							<DrawerController.Screen 
								name="EventsScreen"
								options={{
									title: 'Events',
									drawerIcon: () => (
										<EventsIcon height={25} width={25} />
									),
								}}
								component={EventsScreen}
							/>

							<DrawerController.Screen 
								name="SettingsScreen"
								options={{
									title: 'Settings',
									drawerIcon: () => (
										<SettingsIcon height={25} width={25} />
									),
								}}
								component={SettingsScreen}
							/>
						</DrawerController.Navigator>
					</NavigationContainer>
				</PersistGate>
			</Provider>
		</SafeAreaProvider>
	);
}

export default App;
