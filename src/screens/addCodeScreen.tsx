import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import tailwind from '../utils/tailwind';
import validateForm, { FormData } from '../utils/validation';
import { EventsProps } from '../types';
import { ContentView, IconSelector } from '../components';

const AddCodeScreen = (props: EventsProps) => {
	const [image, setImage] = useState<any>(null);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [formErrors, setFormErrors] = useState<any>({});
	const [formData, setFormData] = useState<FormData>({
		code: {
			value: '',
			rules: [{ required: true }],
		},
		expireDate: {
			value: new Date(),
			rules: [],
		},
		rewards: {
			value: [
				{
					name: '',
					amount: '1',
					icon: '',
				},
			],
			rules: [],
		},
	});

	useEffect(() => {
		setFormErrors(validateForm(formData));
	}, [formData]);

	const updateFormValue = (inputName: string, value: any, index?: number) => {
		let newValue = value;

		if (index !== undefined) {
			newValue = [...formData[inputName].value];
			newValue[index] = value;
		}

		setFormData({
			...formData,
			[inputName]: {
				...formData[inputName],
				value: newValue,
			},
		});
	};

	const submit = async () => {
		if (Object.keys(formErrors).length) {
			return;
		}

		let imageUrl = '';

		if (image !== null) {
			try {
				const reference = storage().ref(image.fileName).putFile(image.uri);

				reference.on('state_changed', snapshot => {
					setUploadProgress((100 * snapshot.bytesTransferred) / snapshot.totalBytes);
				});

				await reference;

				imageUrl = await storage().ref(image.fileName).getDownloadURL();
			} catch (e) {
				Alert.alert('Error', 'Error uploading image');
				return;
			}
		}

		firestore()
			.collection('codes')
			.add({
				code: formData.code.value,
				expire_date: formData.expireDate.value.toISOString().split('T')[0],
				awards: formData.rewards.value.map((reward: { name: string; amount: string; icon: string }) => ({
					name: reward.name,
					amount: reward.amount,
					icon: reward.icon,
				})),
				image: imageUrl,
			})
			.then(() => {
				Alert.alert('Code added!');
			})
			.catch(() => {
				Alert.alert('Error adding code!');
			});
	};

	const pickImage = async () => {
		const imageSelected = await launchImageLibrary({
			mediaType: 'photo',
			quality: 0.8,
		});

		if (imageSelected.assets) {
			setImage(imageSelected.assets[0]);
		}
	};

	const removeReward = (index: number) => {
		const rewardsValue = formData.rewards.value.filter((item: string, key: number) => index !== key);

		setFormData({
			...formData,
			rewards: {
				...formData['rewards'],
				value: rewardsValue,
			},
		});
	};

	const newReward = () => {
		setFormData({
			...formData,
			rewards: {
				...formData['rewards'],
				value: [
					...formData['rewards'].value,
					{
						name: '',
						amount: '1',
						icon: '',
					},
				],
			},
		});
	};

	return (
		<ContentView>
			<ScrollView contentContainerStyle={tailwind('p-3')}>
				<View style={tailwind('mb-3')}>
					<TouchableOpacity
						style={tailwind('border border-gray-400 w-1/2 h-12 px-2 mx-auto mb-2 rounded')}
						onPress={pickImage}
					>
						<View style={tailwind('flex items-center justify-center h-full')}>
							<Text style={tailwind('font-genshin')}>Pick image</Text>
						</View>
					</TouchableOpacity>

					{image && (
						<Text
							numberOfLines={1}
							style={tailwind('font-genshin text-sm')}
						>
							{image.uri}
						</Text>
					)}
				</View>

				<TextInput
					style={tailwind('font-genshin border border-gray-400 bg-gray-100 px-2 h-12 rounded')}
					onChangeText={value => updateFormValue('code', value)}
					value={formData.code.value}
					placeholder="Code"
				/>

				{formErrors.code && (
					<View style={tailwind('mt-1')}>
						{formErrors.code.includes('required') && (
							<Text style={tailwind('text-red-500 mt-1 font-genshin')}>Code is required</Text>
						)}
					</View>
				)}

				<DatePicker
					mode="date"
					androidVariant="nativeAndroid"
					textColor="#72716F"
					date={formData.expireDate.value}
					onDateChange={(value: Date) => updateFormValue('expireDate', value)}
					style={tailwind('mx-auto')}
				/>

				{formData.rewards.value.map((reward: { name: string; amount: string; icon: string }, index: number) => (
					<View
						key={'new-' + index + '-' + formData.rewards.value.length}
						style={tailwind('flex mb-2')}
					>
						<View style={tailwind('flex flex-row justify-between w-full mb-2.5')}>
							<TextInput
								style={tailwind('font-genshin border border-gray-400 bg-gray-100 px-2 w-4.25/5 h-12 rounded')}
								onChangeText={value =>
									updateFormValue(
										'rewards',
										{
											...reward,
											name: value,
										},
										index,
									)
								}
								value={reward.name}
								placeholder="Name (auto)"
								editable={false}
							/>

							<IconSelector
								itemSelected={(item: any) => {
									updateFormValue(
										'rewards',
										{
											...reward,
											name: item.name,
											icon: item.icon_url,
										},
										index,
									);
								}}
								preview={reward.icon}
							/>
						</View>

						<View style={tailwind('flex flex-row justify-between w-full mb-2.5')}>
							<TextInput
								style={[
									tailwind('font-genshin border border-gray-400 bg-gray-100 px-2 h-12 rounded'),
									formData.rewards.value.length > 1 ? tailwind('w-4.25/5') : tailwind('w-full'),
								]}
								onChangeText={value =>
									updateFormValue(
										'rewards',
										{
											...reward,
											amount: value,
										},
										index,
									)
								}
								value={reward.amount}
								placeholder="Amount"
								keyboardType="numeric"
							/>

							{formData.rewards.value.length > 1 && (
								<TouchableOpacity
									style={tailwind('border border-gray-400 w-12 h-12 rounded')}
									onPress={() => removeReward(index)}
								>
									<View style={tailwind('flex items-center justify-center h-full')}>
										<Text style={tailwind('font-genshin text-3xl')}>-</Text>
									</View>
								</TouchableOpacity>
							)}
						</View>
					</View>
				))}

				<TouchableOpacity
					style={tailwind('border border-gray-400 w-12 h-12 mx-auto mb-4 rounded')}
					onPress={newReward}
				>
					<View style={tailwind('flex items-center justify-center h-full')}>
						<Text style={tailwind('font-genshin text-3xl')}>+</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={tailwind('border border-gray-400 w-1/2 h-12 px-2 mx-auto rounded')}
					onPress={submit}
				>
					<View style={tailwind('flex items-center justify-center h-full')}>
						<Text style={tailwind('font-genshin')}>Add</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</ContentView>
	);
};

export default AddCodeScreen;
