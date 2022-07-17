import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import useBus from 'use-bus';
import tailwind from '../utils/tailwind';
import { GenshinData, WishCounterProps } from '../types';
import { ContentView, ErrorModal, HelpModal } from '../components';
import wishCounter from '../utils/wishCounter';
import { useRecoilState } from 'recoil';
import { wishCounterState } from '../utils/store';

const WishCounterScreen = (props: WishCounterProps) => {
	const [isHelpVisible, setIsHelpVisible] = useState<boolean>(false);
	const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [url, setUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [progressMessage, setProgressMessage] = useState<string>('');
	const [banners, setBanners] = useRecoilState(wishCounterState);

	useBus(
		'@wishCounter/progress',
		ev => setProgressMessage(`${ev.payload.title} Banner (x${ev.payload.wishCount} Wishes)`),
		[progressMessage],
	);

	const initWishCounter = () => {
		const urlParsed = url.match(/https:\/\/.*\//g);

		if (!urlParsed) {
			setError('The URL is not valid');
			setIsErrorVisible(true);
			return;
		}

		setLoading(true);

		wishCounter(urlParsed.toString())
			.then(banners => {
				setBanners(banners);
				setLoading(false);
				setProgressMessage('');
			})
			.catch(err => {
				setLoading(false);
				setProgressMessage('');
				setError(err.toString());
				setIsErrorVisible(true);
			});
	};

	return (
		<ContentView>
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
				{loading ? (
					<View style={tailwind('flex items-center')}>
						<Image
							style={tailwind('w-1/2 -mt-3')}
							resizeMode="contain"
							source={require('../assets/images/loading.gif')}
						/>
						{progressMessage.length > 0 && (
							<Text
								style={tailwind('bg-black bg-opacity-5 -mt-4 mb-3 px-3 py-2 rounded text-black')}
							>
								{progressMessage}
							</Text>
						)}
					</View>
				) : (
					<View style={tailwind('flex items-center mt-4')}>
						<TextInput
							onChangeText={text => setUrl(text)}
							placeholder="Paste text here... Webpage not available..."
							placeholderTextColor="#CCCCCC"
							style={tailwind('bg-white text-gray-600 w-4/5 p-2 rounded text-sm mb-4')}
						/>

						<View style={tailwind('flex flex-row mb-4')}>
							<TouchableOpacity
								style={tailwind('mr-2')}
								onPress={initWishCounter}
							>
								<View style={tailwind('bg-yellow-400 py-2 px-4 rounded')}>
									<Text style={tailwind('font-genshin text-white text-center')}>Get wishes</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => setIsHelpVisible(true)}>
								<View style={tailwind('bg-yellow-400 py-2 px-4 rounded')}>
									<Text style={tailwind('font-genshin text-white text-center')}>How to use</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				)}

				{banners
					.filter((banner: GenshinData) => {
						if (banner.banner.code === 100 && props.hiddenBeginnersBanner) {
							return false;
						}

						return true;
					})
					.map((banner: GenshinData) => (
						<View
							style={tailwind('m-2')}
							key={banner.banner.code}
						>
							<Text style={tailwind('pl-2 font-genshin text-screen-title')}>
								{banner.banner.title}
							</Text>

							<View style={tailwind('bg-yellow-100 rounded flex flex-row justify-between m-2 p-4')}>
								<View>
									<Text style={tailwind('font-genshin text-base text-screen-subtitle')}>
										5 ★ Pity
									</Text>
									<Text style={tailwind('font-genshin text-xs text-screen-subtitle')}>
										Guaranteed at {banner.banner.code === 302 ? '80' : '90'}
									</Text>
								</View>
								<View style={tailwind('flex justify-center')}>
									<Text style={tailwind('font-genshin text-2xl text-screen-subtitle')}>
										{banner.pity.fiveStarts}
									</Text>
								</View>
							</View>

							<View style={tailwind('bg-yellow-100 rounded flex flex-row justify-between m-2 p-4')}>
								<View>
									<Text style={tailwind('font-genshin text-base text-screen-subtitle')}>
										4 ★ Pity
									</Text>
									<Text style={tailwind('font-genshin text-xs text-screen-subtitle')}>
										Guaranteed at 10
									</Text>
								</View>
								<View style={tailwind('flex justify-center')}>
									<Text style={tailwind('font-genshin text-2xl text-screen-subtitle')}>
										{banner.pity.fourStarts}
									</Text>
								</View>
							</View>
						</View>
					))}
			</ScrollView>
		</ContentView>
	);
};

export default WishCounterScreen;
