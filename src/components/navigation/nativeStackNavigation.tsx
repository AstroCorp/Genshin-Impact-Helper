import React from 'react';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import { AddCodeScreen } from '../../screens';
import { DrawerNavigation, HeaderNativeStack } from '../';

const { Navigator: NativeStackNavigator, Screen: NativeStackScreen } = createNativeStackNavigator();

const NativeStackNavigation = () => (
	<NativeStackNavigator
		initialRouteName="DrawerNavigation"
		screenOptions={{ header: (props: NativeStackHeaderProps) => <HeaderNativeStack {...props} /> }}
	>
		<NativeStackScreen
			name="DrawerNavigation"
			component={DrawerNavigation}
			options={{ headerShown: false }}
		/>
		<NativeStackScreen
			name="AddCodeScreen"
			component={AddCodeScreen}
			options={{ title: 'Add code', animation: 'slide_from_right' }}
		/>
	</NativeStackNavigator>
);

export default NativeStackNavigation;
