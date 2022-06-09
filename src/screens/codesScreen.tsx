import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import tailwind from '../utils/tailwind';
import { EventsProps, GenshinCode } from '../types';
import { ErrorModal } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CodesScreen = (props: EventsProps) => {
	const [ isErrorVisible, setIsErrorVisible ] = useState<boolean>(false);
	const [ error, setError ] = useState<string>('');
	const [ codes, setCodes ] = useState<GenshinCode[]>([]);

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

	const addData = () => {
        firestore()
            .collection('codes')
            .add({
                code: 'GENSHINGIFT',
                expire_date: '2022-07-15',
				awards: [
					{
						name: "Primogen",
						amount: 60,
					},
					{
						name: "Adventurer's Experience",
						amount: 5,
					}
				]
            })
            .then(() => {
                console.log('Code added!');
            });
    }

	const useCode = (code: string) => {
		Linking.openURL(`https://genshin.hoyoverse.com/en/gift?code=${code}`);
	}

	return (
		<SafeAreaView style={tailwind`bg-screen-background flex-1`}>
			<ErrorModal 
				isVisible={isErrorVisible}
				closeModal={() => setIsErrorVisible(false)}
				error={error}
			/>
			
			<ScrollView>
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
