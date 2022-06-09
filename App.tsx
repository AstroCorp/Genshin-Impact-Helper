import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import RNBootSplash from "react-native-bootsplash";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerHeaderProps } from '@react-navigation/drawer';
import { RecoilRoot } from 'recoil';
import { WishCounterScreen, SettingsScreen, EventsScreen, CodesScreen } from './src/screens';
import { Header, Drawer } from './src/components';
import { SettingsIcon, EventsIcon, WishIcon, CodesIcon } from './src/assets/icons';
import { initState, PersistStorage } from './src/utils/store';

const { Navigator, Screen } = createDrawerNavigator();

const App = () => (
	<SafeAreaProvider>
		<StatusBar 
			animated={true} 
			backgroundColor="#454C5C"
			barStyle="light-content"
		/>

		<RecoilRoot initializeState={initState}>
			<PersistStorage />
			<NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
				<Navigator 
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
					<Screen 
						name="WishCounterScreen"
						options={{
							title: 'Wish Counter',
							drawerIcon: () => (
								<WishIcon height={25} width={25} />
							),
						}}
						component={WishCounterScreen}
					/>

					<Screen 
						name="EventsScreen"
						options={{
							title: 'Events',
							drawerIcon: () => (
								<EventsIcon height={25} width={25} />
							),
						}}
						component={EventsScreen}
					/>

					<Screen 
						name="CodesScreen"
						options={{
							title: 'Codes',
							drawerIcon: () => (
								<CodesIcon height={25} width={25} />
							),
						}}
						component={CodesScreen}
					/>

					<Screen 
						name="SettingsScreen"
						options={{
							title: 'Settings',
							drawerIcon: () => (
								<SettingsIcon height={25} width={25} />
							),
						}}
						component={SettingsScreen}
					/>
				</Navigator>
			</NavigationContainer>
		</RecoilRoot>
	</SafeAreaProvider>
);

export default App;
