import React, { useState } from 'react';
import { View, Text, TouchableNativeFeedback, Alert } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { HomeProps } from '../types';
import wishCounter from '../utils/wish';

const Home = (props: HomeProps) => {
	const [ loading, setLoading ] = useState<boolean>(false);

	const initWishCounter = async () => {
		const genshinLink = 'https://webstatic-sea.mihoyo.com/hk4e/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=0301d740377c4ba8282b4efb0a966c7de36203&timestamp=1634082385&lang=es&device_type=mobile&ext=%7b%22loc%22%3a%7b%22x%22%3a1689.26220703125%2c%22y%22%3a285.6966552734375%2c%22z%22%3a386.15338134765627%7d%2c%22platform%22%3a%22Android%22%7d&game_version=OSRELAndroid2.2.0_R4705718_S4715326_D4715326&plat_type=android&region=os_euro&authkey=BD9SgLCXtiOvFsLyZZQpg2JxP1QY4lCJ06m2rglDP%2bhdu8HPGaHvZ3b3IuCqwUAwA56t9PP7YxhyynPqDk6XIy3CLr2RiQ4r7MSRa2BhKOVG6xj4tSGxTDHNgw2%2b5nYZjqnI4mzuOVcx8IU6pMjEF7RKWbO%2bSZW%2fOY%2bJIq2ku9EKblLIPv4k9QxhFHO0rq2Xdzun%2bRfGhOyb0%2bVyoapXAjB4jlT3QGMgDBLVMPimr5J2DSYnGhhTpyXz3UdBch%2fcibnnM2euMqN%2f0SgHR1%2fu2uAkXqAWjyl0juO%2fEFeFpXlZiW35o4A7vxtsKHBO24g%2bNzhd2BTCXKrz7B60E3O71BDub%2bONqHGwXh75BaqQDqRI589DzJVb1G1uikXhkB%2bc0LX7EP3glZQYqUcEc1zKfh99NdqCsj%2ffn27H3m3M989U3p8SIc%2fqfqXJb2UmwzxxmcVvfycpTnkKrN02ch8ERQ1T7ISTbfUcghn2CJ4mnInh7poobtQbQF%2beJ9OMJm%2bf7i5MtrddOrWXCuCdoUV6YuA3oIEgMHS%2fjdmodyfGIj5gY0m1bOreWk6tOHD3M15Pvm4C2MEttB4wGpd0aZxaypIqdgLnGVkIy8zQDlYnLzRlpcIUPpwa4QUHheBiMrcb29YmSQU0lNhTzfnczpnR3F2cksNpM3C%2b76kQrvzxU%2bs82MeG%2b2b3NOlKuYMxw3lnYW6iTQAq5qBw3ZJyZN4E0Nu5%2b05yko6JNCnRGC31evvz5bf89ZPIhSDKfJGKOhPU7OjEfBfFTJA1do8cBGh5MFHtO1AfK9rmE7U0i8Ch%2f1DLvvQuUWVwSkKAsdVA3jx%2fJsMRgURStu3araPS5sfGQ8ijyR8y4UQeDwV%2bhEWrjTCbYse5NDRF7S7NSrk%2fwVPtY3n0RLeNyMn9Pueg7xBjaW66InloewvobLiOujO%2bUYHvVDHxA1eF6C5J0Nuq9qjLAjBbbwY%2b%2fuuASraCdtzM1NsXkO2vU5jNcLoYajkKdLzsmg1M2VSGYgf9jrpQAgNt00qURZd%2babCd5%2fQJQKrgfqYyQNKGFSzCDto%2bZ3V1I5S4XxcthlygilvapHurcTbcUx7NqygRdqbi12gvkXnnb3BVJ%2bFGmyE5cByj1dS%2biK02W6h7IUAzLaXQQgx1Z7JsqJZFblEtILjlg5%2f%2bs6W2IG1LJdUy13mmryLGjMvSkFgp9VziDTU9zacsy0IYjb33re7DX01EchYRp89gn2p96DH%2fp5wVajiXXCtfXzVM037qD9DdKHSiZOeUW0YxSC0wi01TWyh0YFWkoyJDJ3b6YCuaLdkaIuKIiJWGd6UvQhbrxk5sXCe%2fFrY1aAjRsW8pDmhohur3LFrPQsBmvAzwGw%3d%3d&game_biz=hk4e_global#/log';
		const url = genshinLink.match(/https:\/\/.*\//g);

		if (!url) {
			Alert.alert('Ups...', 'The URL is not valid');
			return;
		}
	
		setLoading(true);

		await wishCounter(url.toString()).then(banners => {
			console.log(banners);
			setLoading(false);
		});
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TouchableNativeFeedback onPress={initWishCounter}>
				<View>
					<Text>Get wishes</Text>
				</View>
			</TouchableNativeFeedback>
		</SafeAreaView>
	);
};

export default Home;
