import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { tailwind } from '../utils/tailwind';
import { setBanners } from '../store/actions';
import { GenshinData, HomeProps, State } from '../types';
import { ErrorModal, HelpModal } from '../components';
import wishCounter from '../utils/wish';

const WishCounterScreen = (props: HomeProps) => {
	const [ isHelpVisible, setIsHelpVisible ] = useState<boolean>(false);
	const [ isErrorVisible, setIsErrorVisible ] = useState<boolean>(false);
	const [ error, setError ] = useState<string>('');
	const [ url, setUrl ] = useState<string>('');
	const [ loading, setLoading ] = useState<boolean>(false);

	const initWishCounter = () => {
		// Inalid: https://webstatic-sea.mihoyo.com/hk4e/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=0301d740377c4ba8282b4efb0a966c7de36203&timestamp=1634082385&lang=es&device_type=mobile&ext=%7b%22loc%22%3a%7b%22x%22%3a1689.26220703125%2c%22y%22%3a285.6966552734375%2c%22z%22%3a386.15338134765627%7d%2c%22platform%22%3a%22Android%22%7d&game_version=OSRELAndroid2.2.0_R4705718_S4715326_D4715326&plat_type=android&region=os_euro&authkey=BD9SgLCXtiOvFsLyZZQpg2JxP1QY4lCJ06m2rglDP%2bhdu8HPGaHvZ3b3IuCqwUAwA56t9PP7YxhyynPqDk6XIy3CLr2RiQ4r7MSRa2BhKOVG6xj4tSGxTDHNgw2%2b5nYZjqnI4mzuOVcx8IU6pMjEF7RKWbO%2bSZW%2fOY%2bJIq2ku9EKblLIPv4k9QxhFHO0rq2Xdzun%2bRfGhOyb0%2bVyoapXAjB4jlT3QGMgDBLVMPimr5J2DSYnGhhTpyXz3UdBch%2fcibnnM2euMqN%2f0SgHR1%2fu2uAkXqAWjyl0juO%2fEFeFpXlZiW35o4A7vxtsKHBO24g%2bNzhd2BTCXKrz7B60E3O71BDub%2bONqHGwXh75BaqQDqRI589DzJVb1G1uikXhkB%2bc0LX7EP3glZQYqUcEc1zKfh99NdqCsj%2ffn27H3m3M989U3p8SIc%2fqfqXJb2UmwzxxmcVvfycpTnkKrN02ch8ERQ1T7ISTbfUcghn2CJ4mnInh7poobtQbQF%2beJ9OMJm%2bf7i5MtrddOrWXCuCdoUV6YuA3oIEgMHS%2fjdmodyfGIj5gY0m1bOreWk6tOHD3M15Pvm4C2MEttB4wGpd0aZxaypIqdgLnGVkIy8zQDlYnLzRlpcIUPpwa4QUHheBiMrcb29YmSQU0lNhTzfnczpnR3F2cksNpM3C%2b76kQrvzxU%2bs82MeG%2b2b3NOlKuYMxw3lnYW6iTQAq5qBw3ZJyZN4E0Nu5%2b05yko6JNCnRGC31evvz5bf89ZPIhSDKfJGKOhPU7OjEfBfFTJA1do8cBGh5MFHtO1AfK9rmE7U0i8Ch%2f1DLvvQuUWVwSkKAsdVA3jx%2fJsMRgURStu3araPS5sfGQ8ijyR8y4UQeDwV%2bhEWrjTCbYse5NDRF7S7NSrk%2fwVPtY3n0RLeNyMn9Pueg7xBjaW66InloewvobLiOujO%2bUYHvVDHxA1eF6C5J0Nuq9qjLAjBbbwY%2b%2fuuASraCdtzM1NsXkO2vU5jNcLoYajkKdLzsmg1M2VSGYgf9jrpQAgNt00qURZd%2babCd5%2fQJQKrgfqYyQNKGFSzCDto%2bZ3V1I5S4XxcthlygilvapHurcTbcUx7NqygRdqbi12gvkXnnb3BVJ%2bFGmyE5cByj1dS%2biK02W6h7IUAzLaXQQgx1Z7JsqJZFblEtILjlg5%2f%2bs6W2IG1LJdUy13mmryLGjMvSkFgp9VziDTU9zacsy0IYjb33re7DX01EchYRp89gn2p96DH%2fp5wVajiXXCtfXzVM037qD9DdKHSiZOeUW0YxSC0wi01TWyh0YFWkoyJDJ3b6YCuaLdkaIuKIiJWGd6UvQhbrxk5sXCe%2fFrY1aAjRsW8pDmhohur3LFrPQsBmvAzwGw%3d%3d&game_biz=hk4e_global#/log
		// Valid: https://webstatic-sea.mihoyo.com/hk4e/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=0301d740377c4ba8282b4efb0a966c7de36203&timestamp=1634082385&lang=es&device_type=mobile&ext=%7b%22loc%22%3a%7b%22x%22%3a-3529.9169921875%2c%22y%22%3a235.8752899169922%2c%22z%22%3a-3238.09228515625%7d%2c%22platform%22%3a%22Android%22%7d&game_version=OSRELAndroid2.2.0_R4705718_S4715326_D4715326&plat_type=android&region=os_euro&authkey=BD9SgLCXtiOvFsLyZZQpg2JxP1QY4lCJ06m2rglDP%2bhdu8HPGaHvZ3b3IuCqwUAwA56t9PP7YxhyynPqDk6XIy3CLr2RiQ4r7MSRa2BhKOVG6xj4tSGxTDHNgw2%2b5nYZjqnI4mzuOVcx8IU6pMjEF7RKWbO%2bSZW%2fOY%2bJIq2ku9EKblLIPv4k9QxhFHO0rq2Xdzun%2bRfGhOyb0%2bVyoapXAjB4jlT3QGMgDBLVMPimr5J2DSYnGhhTpyXz3UdBch%2fcibnnM2euMqN%2f0SgHR1%2fu2uAkXqAWjyl0juO%2fEFeFpXlZiW35o4A7vxtsKHBO24g%2bNzhd2BTCXKrz7B60E3O71BDub%2bONqHGwXh75BaqQDqRI589DzJVb1G1uikXhkB%2bc0LX7EP3glZQYqUcEc1zKfh99NdqCsj%2ffn27H3m3M989U3p8SIc%2fqfqXJb2UmwzxxmcVvfycpTnkKrN02ch8ERQ1T7ISTbfUcghn2CJ4mnInh7poobtQbQF%2beJ9OMJm%2bf7i5MtrddOrWXCuCdoUV6YuA3oIEgMHS%2fjdmodyfGIj5gY0m1bOreWk6tOHD3M15Pvm4C2MEttB4wGpd0aZxaypIqdgLnGVkIy8zQDlYnLzRlpcIUPpwa4QUHheBiMrcb29YmSQU0lNhTzfnczpnR3F2cksNpM3C%2b76kQrvzxU%2bs82MeG%2b2b3NOlKuYMxw3lnYW6iTQAq5qBw3ZJyZN4E0Nu5%2b05yko6JNCnRGC31evvz5bf89ZPIhSDKfJGKOhPU7OjEfBfFTJA1do8cBGh5MFHtO1AfK9rmE7U0i8Ch%2f1DLvvQuUWVwSkKAsdVA3jx%2fJsMRgURStu3araPS5sfGQ8ijyR8y4UQeDwV%2bhEWrjTCbYse5NDRF7S7NSrk%2fwVPtY3n0RLeNyMn9Pueg7xBjaW66InloewvobLiOujO%2bUYHvVDHxA1eF6C5J0Nuq9qjLAjBbbwY%2b%2fuuASraCdtzM1NsXkO2vU5jNcLoYajkKdLzsmg1M2VSGYgf9jrpQAgNtdmvYMKd2HHxfBrwNeDUQ%2b%2fe%2bLLSX%2fTRcqLb7a2%2b3PjRkHgC7gAKXJOKNlLjK5YVx694d4JzxEmv9iq2rm9lPJ9XXx6l9swr%2b2%2ftZHiU7eW9ZgJFLYu7on8yz%2bbSiYFMN6hF47DngYrMC3lXYIvTWakf%2fp%2bgAL7sX67GXsAieL4dHZdm0WIpRX9Ua5DFOuu4UAsZ8xz5N4ZFiOgqmHAmMNRAGjiZ4appWWLj6p69u1rEv%2fOj38wYxkewAm9SFIpXHwbE0mxb8iRlQ6St49Q1G%2fyF0lyzK7fs2wvmz8L0F7YwDAWWBHZmQQEETENdvLb0Ex%2fZEu5PK3i%2fVy%2bixG7hyBA%3d%3d&game_biz=hk4e_global#/log
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
										Guaranteed at 90
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
