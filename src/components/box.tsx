import React from 'react';
import { View } from 'react-native';
import { tailwind } from '../utils/tailwind';

const Box = ({ header, children }: any) => (
    <View style={tailwind('bg-modal-content w-full')}>
        <View style={tailwind('bg-modal-header')}>
            <View style={tailwind('items-center m-1 border-white border border-opacity-25')}>
                { header }
            </View>
        </View>

        <View style={tailwind('p-4')}>
            { children }
        </View>
    </View>
);

export default Box;
