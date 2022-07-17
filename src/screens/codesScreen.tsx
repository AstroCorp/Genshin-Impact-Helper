import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Linking, View, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FastImage from 'react-native-fast-image';
import { useRecoilState } from 'recoil';
import firestore from '@react-native-firebase/firestore';
import tailwind from '../utils/tailwind';
import { EventsProps, GenshinCode, SessionState } from '../types';
import { ContentView, ErrorModal, FastImageWrapper } from '../components';
import { sessionState } from '../utils/store';

const CodesScreen = (props: EventsProps) => {
	const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [codes, setCodes] = useState<GenshinCode[]>([]);
	const [session, setSession] = useRecoilState<SessionState>(sessionState);

	useEffect(() => {
		checkSignedIn();

		const subscriber = firestore()
			.collection('codes')
			.onSnapshot(snapshot => {
				const data = snapshot.docs.map(doc => {
					return {
						...doc.data(),
						id: doc.id,
					} as GenshinCode;
				});

				setCodes(data);
			});

		return () => subscriber();
	}, []);

	const checkSignedIn = async () => {
		const checkSession = await GoogleSignin.isSignedIn();
		setSession({
			...session,
			isSignedIn: checkSession,
		});
	};

	const useCode = (code: string) => {
		Linking.openURL(`https://genshin.hoyoverse.com/en/gift?code=${code}`);
	};

	const goToAddNewCode = () => {
		props.navigation.navigate('AddCodeScreen');
	};

	return (
		<ContentView>
			<ErrorModal
				isVisible={isErrorVisible}
				closeModal={() => setIsErrorVisible(false)}
				error={error}
			/>

			<ScrollView>
				{session.isSignedIn && (
					<TouchableOpacity
						style={tailwind('my-4 mx-auto w-1/2')}
						onPress={goToAddNewCode}
					>
						<View style={tailwind('bg-yellow-400 py-2 px-4 rounded')}>
							<Text style={tailwind('font-genshin text-white text-center')}>Add new code</Text>
						</View>
					</TouchableOpacity>
				)}

				{codes.map(code => (
					<TouchableOpacity
						onPress={() => useCode(code.code)}
						key={code.id}
						style={tailwind('bg-screen-box flex flex-col justify-between m-2')}
					>
						<View style={tailwind('h-48')}>
							<FastImageWrapper
								url={
									code.image.length > 0
										? {
												uri: code.image,
												priority: FastImage.priority.normal,
										  }
										: require('../assets/images/codeDefaultBanner.jpg')
								}
								style={tailwind('w-full h-full absolute top-0 left-0 rounded')}
							/>

							<View style={tailwind('flex-1 flex-row m-2')}>
								{code.awards.map((award, index) => (
									<View
										key={code.code + award.name}
										style={tailwind('relative mr-3 w-12 h-12')}
									>
										<FastImageWrapper
											url={require('../assets/images/award_bg.png')}
											style={tailwind('w-12 h-12 absolute rounded-full bg-black bg-opacity-15')}
										/>

										<FastImageWrapper
											url={{
												uri: award.icon,
												priority: FastImage.priority.normal,
											}}
											style={tailwind('w-12 h-12 rounded-full bg-transparent')}
										/>

										<Text
											style={tailwind(
												'absolute -bottom-7 text-center w-12 bg-black bg-opacity-60 text-white text-opacity-80 py-1 px-2 rounded text-xs font-genshin',
											)}
										>
											x{award.amount}
										</Text>
									</View>
								))}
							</View>

							<View style={tailwind('flex-1 flex-col justify-end')}>
								<View style={tailwind('bg-black bg-opacity-35 rounded-b p-3')}>
									<Text style={tailwind('font-genshin text-base text-gray-200 uppercase tracking-widest')}>{code.code}</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
		</ContentView>
	);
};

export default CodesScreen;
