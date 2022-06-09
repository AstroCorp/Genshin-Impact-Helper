import React from 'react';
import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import tailwind from '../utils/tailwind';
import { EventsProps, State } from '../types';

const EventsScreen = (props: EventsProps) => {
	return (
		<SafeAreaView style={tailwind`bg-screen-background flex-1`}>
			<ScrollView>
				<Text style={tailwind`p-2`}>In progress...</Text>
			</ScrollView>
		</SafeAreaView>
	);
}

const mapStateToProps = (state: State) => {
    return {
        //
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        //
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
