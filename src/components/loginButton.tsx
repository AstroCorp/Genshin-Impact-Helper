import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const LoginButton = () => {
	const [ isSignedIn, setIsSignedIn ] = useState<boolean>(true);

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
	}

	const checkSignedIn = async () => {
		const checkSession = await GoogleSignin.isSignedIn();
		setIsSignedIn(checkSession);
	}

	return (
        <>
            {
                !isSignedIn && (
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={onGoogleButtonPress}
                    />
                )
            }
        </>
	);
}

export default LoginButton;
