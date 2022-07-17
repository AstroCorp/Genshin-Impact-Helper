import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { TouchableOpacity, Text, View, ViewProps } from 'react-native';
import tailwind from '../utils/tailwind';
import { useRecoilState } from 'recoil';
import { sessionState } from '../utils/store';
import { SessionState } from '../types';

const LoginButton = (props: ViewProps) => {
	const [session, setSession] = useRecoilState<SessionState>(sessionState);

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: '719414569766-nerps5bi3rvuv4f71d630q54nnmpq4t4.apps.googleusercontent.com',
		});

		checkSignedIn();
	}, []);

	const onGoogleButtonPress = async () => {
		const { idToken } = await GoogleSignin.signIn();
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		await auth().signInWithCredential(googleCredential);
		await checkSignedIn();
	};

	const checkSignedIn = async () => {
		const checkSession = await GoogleSignin.isSignedIn();
		setSession({
			...session,
			isSignedIn: checkSession,
		});
	};

	const logout = async () => {
		await GoogleSignin.revokeAccess();
		await auth().signOut();
		await checkSignedIn();
	};

	return (
		<View {...props}>
			{!session.isSignedIn ? (
				<GoogleSigninButton
					style={{ width: 192, height: 48 }}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={onGoogleButtonPress}
				/>
			) : (
				<TouchableOpacity
					style={tailwind('bg-header-underline rounded py-2 px-4')}
					onPress={logout}
				>
					<Text style={tailwind('font-genshin text-white')}>Logout</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default LoginButton;
