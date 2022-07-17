import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerHeaderProps } from '@react-navigation/drawer';
import { WishCounterScreen, SettingsScreen, EventsScreen, CodesScreen } from '../../screens';
import { HeaderDrawer, DrawerNav } from '../../components';
import { SettingsIcon, EventsIcon, WishIcon, CodesIcon } from '../../assets/icons';

const { Navigator: DrawerNavigator, Screen: DrawerScreen } = createDrawerNavigator();

const DrawerNavigation = () => (
	<DrawerNavigator
		initialRouteName="WishCounterScreen"
		drawerContent={(props: DrawerContentComponentProps) => <DrawerNav {...props} />}
		screenOptions={{
			header: (props: DrawerHeaderProps) => <HeaderDrawer {...props} />,
		}}
	>
		<DrawerScreen
			name="WishCounterScreen"
			options={{
				title: 'Wish Counter',
				drawerIcon: () => (
					<WishIcon
						height={25}
						width={25}
					/>
				),
			}}
			component={WishCounterScreen}
		/>

		<DrawerScreen
			name="EventsScreen"
			options={{
				title: 'Events',
				drawerIcon: () => (
					<EventsIcon
						height={25}
						width={25}
					/>
				),
			}}
			component={EventsScreen}
		/>

		<DrawerScreen
			name="CodesScreen"
			options={{
				title: 'Codes',
				drawerIcon: () => (
					<CodesIcon
						height={25}
						width={25}
					/>
				),
			}}
			component={CodesScreen}
		/>

		<DrawerScreen
			name="SettingsScreen"
			options={{
				title: 'Settings',
				drawerIcon: () => (
					<SettingsIcon
						height={25}
						width={25}
					/>
				),
			}}
			component={SettingsScreen}
		/>
	</DrawerNavigator>
);

export default DrawerNavigation;
