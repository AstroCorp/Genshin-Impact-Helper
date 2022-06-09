import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from '../utils/tailwind';
import { SettingsProps } from '../types';
import { LoginButton } from '../components';
import { configState } from '../utils/store';

const SettingsScreen = (props: SettingsProps) => {
	const [ config, setConfig ] = useRecoilState(configState);

	const toggleHiddenBeginnersBanner = () => {
		setConfig({
			...config,
			hiddenBeginnersBanner: !config.hiddenBeginnersBanner,
		});
	}

	return (
		<SafeAreaView style={tailwind`bg-screen-background flex-1 items-center`}>
			<LoginButton style={tailwind`mt-4`} />
			
			<View style={tailwind`flex flex-row justify-between w-5/6 mt-4`}>
				<Text style={tailwind`font-genshin text-screen-text text-sm mt-1`}>
					Hide Beginners Banner
				</Text>
	
				<Switch
					trackColor={{ 
						false: "#69748C",
						true: "#D6C3B2",
					}}
					thumbColor={config.hiddenBeginnersBanner ? "#D17B6A" : "#454C5C"}
					onValueChange={toggleHiddenBeginnersBanner}
					value={config.hiddenBeginnersBanner}
				/>
			</View>
		</SafeAreaView>
	);
}

export default SettingsScreen;
