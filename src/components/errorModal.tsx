import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { CloseIcon } from '../assets/icons';
import { tailwind } from '../utils/tailwind';

const ErrorModal = ({ isVisible, closeModal, error }: any) => (
    <Modal isVisible={isVisible} animationInTiming={500} animationOutTiming={500}>
        <View style={tailwind('bg-modal w-full rounded p-0.5')}>
            <View style={tailwind('border-modal border-2 rounded')}>
                <View style={tailwind('items-end m-4')}>
                    <TouchableOpacity onPress={closeModal}>
                        <View>
                            <CloseIcon height={25} width={25} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={tailwind('p-2 items-center')}>
                    <Image source={require('../assets/images/error.gif')} />
                    <Text style={tailwind('font-genshin text-lg text-center mt-4 mb-2')}>{ error }</Text>
                </View>
            </View>
        </View>
    </Modal>
);

export default ErrorModal;
