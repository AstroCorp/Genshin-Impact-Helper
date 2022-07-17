import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { FastImageWrapper } from '../components';
import { CloseModalIcon, SearchIcon } from '../assets/icons';
import tailwind from '../utils/tailwind';

const IconSelector = ({ itemSelected, preview }: any) => {
	const [isVisible, setIsVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [results, setResults] = useState([]);
	const [delay, setDelay] = useState<any>(null);
	const [selectedItem, setSelectedItem] = useState<any>(preview);

	const fetchData = () => {
		if (delay !== null) {
			clearTimeout(delay);
			setDelay(null);
		}

		if (searchValue.trim().length < 1) {
			return;
		}

		const timeout = setTimeout(() => {
			const url = encodeURIComponent('https://sg-wiki-api.hoyolab.com/hoyowiki/wapi/search?keyword=' + searchValue.trim());
			fetch('https://api.allorigins.win/raw?url=' + url, {
				headers: {
					accept: 'application/json, text/plain, */*',
					'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
					'sec-ch-ua': '"Chromium";v="104", "/Not)A;Brand";v="24"',
					'sec-ch-ua-mobile': '?0',
					'sec-ch-ua-platform': '"Windows"',
					'sec-fetch-dest': 'empty',
					'sec-fetch-mode': 'cors',
					'sec-fetch-site': 'same-site',
					'x-rpc-language': 'en-us',
				},
				referrer: 'https://wiki.hoyolab.com/',
				body: null,
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			})
				.then(response => response.json())
				.then(res => {
					const iconList = res.data.list;

					if ('primogems'.includes(searchValue.trim())) {
						iconList.push({
							entry_page_id: 'custom-1',
							name: 'Primogems',
							icon_url:
								'https://static.wikia.nocookie.net/gen-impact/images/1/1b/Objeto_Protogemas.png/revision/latest/scale-to-width-down/80?cb=20220109010240&path-prefix=es',
						});
					}

					setResults(iconList);
				})
				.catch(error => console.log(error));
		}, 400);

		setDelay(timeout);
	};

	const selectItem = (item: any) => {
		itemSelected(item);
		setSelectedItem(item.icon_url);
		setIsVisible(false);
	};

	return (
		<>
			<TouchableOpacity
				style={tailwind('border border-gray-400 h-12 w-12 px-2 rounded')}
				onPress={() => setIsVisible(true)}
			>
				<View style={tailwind('flex items-center justify-center h-full')}>
					{selectedItem ? (
						<FastImageWrapper
							key={selectedItem}
							url={selectedItem}
							style={tailwind('h-12 w-12')}
						/>
					) : (
						<SearchIcon
							height={20}
							width={20}
						/>
					)}
				</View>
			</TouchableOpacity>

			<Modal
				isVisible={isVisible}
				animationInTiming={500}
				animationOutTiming={500}
				backdropTransitionOutTiming={0}
			>
				<View style={tailwind('bg-screen-background w-full')}>
					<View style={tailwind('bg-header-background')}>
						<View style={tailwind('items-center m-1 border-white border border-opacity-25')}>
							<Text style={tailwind('font-genshin text-white text-center text-lg border-header-border border-b p-2 w-1/2')}>
								Icon selector
							</Text>
							<View style={tailwind('absolute right-0 m-1.5')}>
								<TouchableOpacity onPress={() => setIsVisible(false)}>
									<View>
										<CloseModalIcon
											height={32}
											width={32}
										/>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View style={tailwind('p-4')}>
						<TextInput
							style={tailwind('font-genshin border border-gray-400 bg-gray-100 px-2 w-full h-12 rounded')}
							onChangeText={setSearchValue}
							onEndEditing={fetchData}
							value={searchValue}
							placeholder="Icon name"
						/>

						<FlatList
							data={results}
							style={tailwind('h-72 mt-2')}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={tailwind('h-12 mb-3')}
									onPress={() => selectItem(item)}
								>
									<View style={tailwind('flex flex-row items-center')}>
										<FastImageWrapper
											url={item.icon_url}
											style={tailwind('h-12 w-12 rounded-full')}
										/>
										<Text
											style={tailwind('ml-3 font-genshin')}
											numberOfLines={1}
										>
											{item.name}
										</Text>
									</View>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default IconSelector;
