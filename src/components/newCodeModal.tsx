import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import { CloseModalIcon, PlusIcon } from '../assets/icons';
import tailwind from '../utils/tailwind';

const NewCodeModal = ({ isVisible, closeModal }: any) => {
    const [ code, onChangeCode ] = useState('');
    const [ rewards, setRewards ] = useState([{
        name: "",
		amount: "",
    }]);

    const addNewCode = () => {
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
				],
                image: '',
            })
            .then(() => {
                Alert.alert('Code added!');
            })
            .catch(() => {
                Alert.alert('Error adding code!');
            });
    }

    const onChangeRewards = (ev: any, index: number, key: string) => {
        console.log(ev)
    }

    return (
        <Modal 
            isVisible={isVisible} 
            animationInTiming={500} 
            animationOutTiming={500} 
            backdropTransitionOutTiming={0}
        >
            <View style={tailwind`bg-screen-background w-full`}>
                <View style={tailwind`bg-header-background`}>
                    <View style={tailwind`items-center m-1 border-white border border-opacity-25`}>
                        <Text style={tailwind`font-genshin text-white text-center text-lg border-header-border-border border-b p-2 w-1/2`}>
                            Add new code
                        </Text>
                        <View style={tailwind`absolute right-0 m-1.5`}>
                            <TouchableOpacity onPress={closeModal}>
                                <View>
                                    <CloseModalIcon height={32} width={32} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={tailwind`p-4`}>
                    <TextInput
                        style={tailwind`border border-gray-400 bg-gray-100 px-2`}
                        onChangeText={onChangeCode}
                        value={code}
                        placeholder="Code"
                    />

                    {
                        rewards.map((reward: { name: string, amount: string }, index) => (
                            <View key={'new-' + index} style={tailwind`flex flex-row justify-between my-2`}>
                                <TextInput
                                    style={tailwind`border border-gray-400 bg-gray-100 px-2 w-2/5`}
                                    onChangeText={(ev) => onChangeRewards(ev, index, 'name')}
                                    value={reward.name}
                                    placeholder="Name"
                                />
                                <TextInput
                                    style={tailwind`border border-gray-400 bg-gray-100 px-2 w-2/5`}
                                    onChangeText={(ev) => onChangeRewards(ev, index, 'amount')}
                                    value={reward.amount}
                                    placeholder="Amount"
                                    keyboardType='numeric'
                                />
                                <TouchableOpacity style={tailwind`border border-gray-400 rounded-full h-10 w-10`}>
                                    <View style={tailwind`flex items-center justify-center`}>
                                        <PlusIcon height={20} width={20} color="#000" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </View>
        </Modal>
    );
}

export default NewCodeModal;
