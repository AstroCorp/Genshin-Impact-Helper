import React from 'react';
import { View, Text } from 'react-native';
import { tailwind } from '../utils/tailwind';

const Header = ({ title }: any) => (
    <View style={tailwind('bg-header')}>
        <View style={tailwind('items-center m-1 border-white border border-opacity-25')}>
            <Text style={tailwind('font-genshin text-white text-center text-lg border-title border-b p-2 w-1/2')}>
				{ title }
			</Text>
        </View>
    </View>
);

export default Header;
