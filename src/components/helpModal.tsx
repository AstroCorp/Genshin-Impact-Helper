import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import CloseModalIcon from '../assets/icons/closeModalIcon';
import { tailwind } from '../utils/tailwind';

const HelpModal = ({ isVisible, closeModal }: any) => (
    <Modal isVisible={isVisible} animationInTiming={500} animationOutTiming={500}>
        <View style={tailwind('bg-modal-content')}>
            <View style={tailwind('bg-modal-header')}>
                <View style={tailwind('items-center m-1 border-white border border-opacity-25')}>
                    <Text style={tailwind('font-genshin text-white text-center text-lg border-modal-title border-b p-2 w-1/2')}>
                        Instructions
                    </Text>
                    
                    <View style={tailwind('absolute right-0 m-1.5')}>
                        <TouchableOpacity onPress={closeModal}>
                            <View>
                                <CloseModalIcon height={32} width={32} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={tailwind('p-4')}>
                <Text style={tailwind('font-genshin mb-2')}>1. Open Wish (in the game).</Text>
                <Text style={tailwind('font-genshin mb-2')}>2. Press History.</Text>
                <Text style={tailwind('font-genshin mb-2')}>3. Wait for it to load.</Text>
                <Text style={tailwind('font-genshin mb-2')}>4. Turn off your Wi-Fi and data connection.</Text>
                <Text style={tailwind('font-genshin mb-2')}>5. Press refresh on top right corner.</Text>
                <Text style={tailwind('font-genshin mb-2')}>6. The page should display an error and show you some text with black font.</Text>
                <Text style={tailwind('font-genshin mb-2')}>7. Hold the text and press select all, then copy that text (don't copy only some portion of the text).</Text>
                <Text style={tailwind('font-genshin mb-2')}>8. Turn on your Wi-Fi or data connection.</Text>
                <Text style={tailwind('font-genshin mb-2')}>9. Paste the text to the textbox below.</Text>
            </View>
        </View>
    </Modal>
);

export default HelpModal;
