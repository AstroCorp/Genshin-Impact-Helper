import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Linking, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import tailwind from '../utils/tailwind';
import { EventsProps, GenshinCode } from '../types';
import { ErrorModal, NewCodeModal } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { sessionState } from '../utils/store';
import { SessionState } from '../types/storte';

const CodesScreen = (props: EventsProps) => {
	const [ isErrorVisible, setIsErrorVisible ] = useState<boolean>(false);
	const [ isNewCodeModalVisible, setIsNewCodeModalVisible ] = useState<boolean>(false);
	const [ error, setError ] = useState<string>('');
	const [ codes, setCodes ] = useState<GenshinCode[]>([]);
	const [ session, setSession ] = useRecoilState<SessionState>(sessionState);

	useEffect(() => {
		const subscriber = firestore()
		  .collection('codes')
		  .onSnapshot(snapshot => {
			const data = snapshot.docs.map(doc => doc.data() as GenshinCode);
			setCodes(data);
		  });
	
		// Stop listening for updates when no longer required
		return () => subscriber();
	  }, []);

	const useCode = (code: string) => {
		Linking.openURL(`https://genshin.hoyoverse.com/en/gift?code=${code}`);
	}

	const openModalNewCode = () => {
		setIsNewCodeModalVisible(true);
	}

	return (
		<SafeAreaView style={tailwind`bg-screen-background flex-1`}>
			<ErrorModal 
				isVisible={isErrorVisible}
				closeModal={() => setIsErrorVisible(false)}
				error={error}
			/>

			<NewCodeModal
				isVisible={isNewCodeModalVisible}
				closeModal={() => setIsNewCodeModalVisible(false)}
			/>
			
			<ScrollView>
				{
					session.isSignedIn && (
						<TouchableOpacity style={tailwind`my-4 mx-auto w-1/2`} onPress={openModalNewCode}>
							<View style={tailwind`bg-yellow-400 py-2 px-4 rounded`}>
								<Text style={tailwind`font-genshin text-white text-center`}>
									Add new code
								</Text>
							</View>
						</TouchableOpacity>
					)
				}

				{
					codes.map((code) => (
						<TouchableOpacity onPress={() => useCode(code.code)} key={code.code} style={tailwind`bg-yellow-100 rounded flex flex-col justify-between m-2 p-4`}>
							<Text style={tailwind`font-genshin text-base text-screen-subtitle`}>
								{code.code}
							</Text>
							<Text style={tailwind`font-genshin text-xs text-screen-subtitle`}>
								{
									code.awards.map((award, index) => `${award.name}: x${award.amount}${index < code.awards.length - 1 ? ', ' : ''}`)
								}
							</Text>
						</TouchableOpacity>
					))
				}
			</ScrollView>
		</SafeAreaView>
	);
}

export default CodesScreen;
