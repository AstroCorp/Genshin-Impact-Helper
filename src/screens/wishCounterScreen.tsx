import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { tailwind } from '../utils/tailwind';
import { setBanners } from '../store/actions';
import { GenshinData, WishCounterProps, State } from '../types';
import { ErrorModal, HelpModal } from '../components';
import wishCounter from '../utils/wishCounter';

const WishCounterScreen = (props: WishCounterProps) => {
	const [ isHelpVisible, setIsHelpVisible ] = useState<boolean>(false);
	const [ isErrorVisible, setIsErrorVisible ] = useState<boolean>(false);
	const [ error, setError ] = useState<string>('');
	const [ url, setUrl ] = useState<string>('');
	const [ loading, setLoading ] = useState<boolean>(false);

	const initWishCounter = () => {
		const urlParsed = url.match(/https:\/\/.*\//g);

		if (!urlParsed) {
			setError('The URL is not valid');
			setIsErrorVisible(true);
			return;
		}
	
		setLoading(true);

		wishCounter(urlParsed.toString()).then(banners => {
			props.setBanners(banners);
			setLoading(false);
		}).catch(err => {
			setLoading(false);
			setError(err.toString());
			setIsErrorVisible(true);
		});
	}

	return (
		<SafeAreaView style={tailwind('bg-content flex-1')}>
			<HelpModal 
				isVisible={isHelpVisible}
				closeModal={() => setIsHelpVisible(false)}
			/>

			<ErrorModal 
				isVisible={isErrorVisible}
				closeModal={() => setIsErrorVisible(false)}
				error={error}
			/>
			
			<ScrollView>
				{
					loading ? (
						<View style={tailwind('flex items-center')}>
							<Image 
								style={tailwind('w-1/2')} 
								resizeMode="contain" 
								source={require('../assets/images/loading.gif')} 
							/>
						</View>
					) : (
						<View style={tailwind('flex items-center mt-4')}>
							<TextInput 
								onChangeText={text => setUrl(text)}
								placeholder="Paste text here... Webpage not available..."
								style={tailwind('bg-white w-4/5 p-2 rounded text-sm mb-4')}
							/>

							<View style={tailwind('flex flex-row mb-4')}>
								<TouchableOpacity style={tailwind('mr-2')} onPress={initWishCounter}>
									<View style={tailwind('bg-yellow-400 py-2 px-4 rounded')}>
										<Text style={tailwind('font-genshin text-white text-center')}>
											Get wishes
										</Text>
									</View>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => setIsHelpVisible(true)}>
									<View style={tailwind('bg-yellow-400 py-2 px-4 rounded')}>
										<Text style={tailwind('font-genshin text-white text-center')}>
											How to use
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					)
				}
				
				{
					props.banners.filter((banner: GenshinData) => {
						if (banner.banner.code === 100 && props.hiddenBeginnersBanner) {
							return false;
						}
						
						return true;
					}).map((banner: GenshinData) => (
						<View style={tailwind('m-2')} key={banner.banner.code}>
							<Text style={tailwind('pl-2 font-genshin')}>{ banner.banner.title }</Text>

							<View style={tailwind('bg-yellow-100 rounded flex flex-row justify-between m-2 p-4')}>
								<View>
									<Text style={tailwind('font-genshin text-base')}>
										5 ★ Pity
									</Text>
									<Text style={tailwind('font-genshin text-xs')}>
										Guaranteed at { banner.banner.code === 302 ? '80' : '90' }
									</Text>
								</View>
								<View style={tailwind('flex justify-center')}>
									<Text style={tailwind('font-genshin text-2xl')}>
										{ banner.pity.fiveStarts }
									</Text>
								</View>
							</View>

							<View style={tailwind('bg-yellow-100 rounded flex flex-row justify-between m-2 p-4')}>
								<View>
									<Text style={tailwind('font-genshin text-base')}>
										4 ★ Pity
									</Text>
									<Text style={tailwind('font-genshin text-xs')}>
										Guaranteed at 10
									</Text>
								</View>
								<View style={tailwind('flex justify-center')}>
									<Text style={tailwind('font-genshin text-2xl')}>
										{ banner.pity.fourStarts }
									</Text>
								</View>
							</View>
						</View>
					))
				}
			</ScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state: State) => {
    return {
        banners: state.mainReducer.banners,
		hiddenBeginnersBanner: state.mainReducer.hiddenBeginnersBanner,
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setBanners: (value: GenshinData[]) => dispatch(setBanners(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishCounterScreen);
