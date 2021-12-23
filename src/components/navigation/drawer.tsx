import React from 'react';
import { ScrollView, View, Text, TouchableNativeFeedback } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { CommonActions, DrawerActions } from '@react-navigation/routers';
import tailwind from '../../utils/tailwind';

const Drawer = ({ descriptors, state, navigation }: DrawerContentComponentProps) => (
    <ScrollView style={tailwind`bg-drawer-background`}>
        <View style={tailwind`flex flex-col mt-3 mx-3`}>
            {
                state.routes.map((route, i) => {
                    const focused = i === state.index;
                    const { drawerIcon, title } = descriptors[route.key].options;
                    const iconNode = drawerIcon ? drawerIcon({ size: 24, focused, color: '' }) : null;

                    return (
                        <TouchableNativeFeedback 
                            key={route.name}
                            onPress={() => {
                                const action = focused 
                                    ? DrawerActions.closeDrawer() 
                                    : CommonActions.navigate({ name: route.name, merge: true })
                                
                                navigation.dispatch({
                                    ...action,
                                    target: state.key,
                                });
                            }}
                        >
                            <View style={tailwind`bg-drawer-button flex flex-row items-center justify-between mb-3 p-3 rounded`}>
                                <Text style={tailwind`font-genshin text-xs text-drawer-text`}>{ title }</Text>
                                <View>{ iconNode }</View>
                            </View>
                        </TouchableNativeFeedback>
                    );
                })
            }
        </View>
    </ScrollView>
);

export default Drawer;
