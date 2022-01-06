import React from 'react';
import { View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import tailwind from '../utils/tailwind';
import { SettingsProps, State } from '../types';
import { toggleHiddenBeginnersBanner } from '../store/actions/mainActions';

const SettingsScreen = (props: SettingsProps) => (
	<SafeAreaView style={tailwind`bg-screen-background flex-1 items-center`}>
		<View style={tailwind`flex flex-row justify-between w-5/6 mt-4`}>
			<Text style={tailwind`font-genshin text-screen-text text-sm mt-1`}>
				Hide Beginners Banner
			</Text>

			<Switch
				trackColor={{ 
					false: "#69748C",
					true: "#D6C3B2",
				}}
				thumbColor={props.hiddenBeginnersBanner ? "#D17B6A" : "#454C5C"}
				onValueChange={props.toggleHiddenBeginnersBanner}
				value={props.hiddenBeginnersBanner}
			/>
		</View>
	</SafeAreaView>
);

const mapStateToProps = (state: State) => {
    return {
        hiddenBeginnersBanner: state.mainReducer.hiddenBeginnersBanner,
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        toggleHiddenBeginnersBanner: () => dispatch(toggleHiddenBeginnersBanner()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
