import { DrawerHeaderProps } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MenuIcon } from '../../assets/icons';
import { tailwind } from '../../utils/tailwind';

const Header = (props: DrawerHeaderProps) => (
    <View style={tailwind('bg-header')}>
        <View style={tailwind('flex flex-row m-1 border-white border border-opacity-25')}>
            <View style={tailwind('absolute mt-2 ml-3')}>
                <TouchableOpacity onPress={props.navigation.openDrawer}>
                    <View>
                        <MenuIcon height={30} width={30} color="#FFF" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={tailwind('w-full items-center')}>
                <Text style={tailwind('font-genshin text-white text-center text-lg border-title border-b p-2 w-1/2')}>
                    { props.options.title }
                </Text>
            </View>
        </View>
    </View>
);

export default Header;