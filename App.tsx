import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { initState, PersistStorage } from './src/utils/store';
import { NativeStackNavigation } from './src/components';

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
				<NativeStackNavigation />
			</NavigationContainer>
		</RecoilRoot>
	</SafeAreaProvider>
);

export default App;
