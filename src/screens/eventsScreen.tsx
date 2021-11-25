import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { tailwind } from '../utils/tailwind';
import { EventsProps, State } from '../types';
import { ErrorModal } from '../components';
import getEvents from '../utils/events';

const EventsScreen = (props: EventsProps) => {
	const [ isErrorVisible, setIsErrorVisible ] = useState<boolean>(false);
	const [ error, setError ] = useState<string>('');
	const [ loading, setLoading ] = useState<boolean>(false);

	useEffect(() => {
		const events = getEvents();
		console.log(events)
	}, []);

	return (
		<SafeAreaView style={tailwind('bg-content flex-1')}>
			<ErrorModal 
				isVisible={isErrorVisible}
				closeModal={() => setIsErrorVisible(false)}
				error={error}
			/>
			
			<ScrollView>
				<Text>Content</Text>
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
