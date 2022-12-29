import React, { createContext, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import toast from '../../components/toast';
import { useNavigation } from '@react-navigation/native';
import { NativeModules } from 'react-native';
import { twitterApiKey, twitterApiKey2, webClientId } from '../../apiKeys/keys';


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const { navigate } = useNavigation()

    const [user, setUser] = useState(null)
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState(0);

    const { RNTwitterSignIn } = NativeModules;

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: webClientId
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,

                // check user is signed in or not

                checkUser: (navi) => {
                    auth().onAuthStateChanged((user) => {
                        if (user) {
                            navigate(navi)
                        } else {
                            toast('no User')
                        }
                    })
                },

                // signIn With Email And Password

                login: async (email, password) => {
                    if (email.length <= 6 && password.length <= 5) {
                        toast('Please enter your credentials')
                    } else {
                        try {
                            await auth().signInWithEmailAndPassword(email, password)
                            toast('Signing...')
                        } catch (error) {
                            if (error.message.includes('auth/too-many-requests')) {
                                toast('You attempt too many requests\nPlease try again later');
                            } else if (error.message.includes('auth/wrong')) {
                                toast('wrong password')
                            } else {
                                toast(error.message)
                            }

                        }
                    }
                },

                // signUp With Email And Password

                register: async (email, password) => {
                    if (email.length <= 6 && password.length <= 5) {
                        toast('Please enter your credentials')
                    } else {
                        try {
                            await auth().createUserWithEmailAndPassword(email, password).then((val) => {
                                toast("Account Created")
                            })
                        } catch (error) {
                            console.log(error.message);
                        }
                    }
                },

                // forgetPassword with email

                forgetPassword: async (email) => {
                    if (email.length <= 6) {
                        toast('Please enter email address')
                    } else {
                        try {
                            await auth().sendPasswordResetEmail(email)
                            toast('email Sent')
                        } catch (error) {
                            console.log(error.message);
                        }
                    }
                },

                // signout from email and password

                signOut: async () => {
                    try {
                        await auth().signOut()
                        toast("signOut")
                    } catch (error) {
                        console.log(error.message);
                    }
                },

                // Phone Authentication

                // {

                phoneLogin: async (phoneNumber) => {
                    try {
                        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                        setConfirm(confirmation)
                    } catch (error) {
                        console.log(error.message)
                    }
                },

                setCode,
                confirm,

                phoneConfirm: async () => {
                    try {
                        await confirm.confirm(code)
                    } catch (error) {
                        toast('Invalid code.')
                    }
                },

                // }

                // Google SignIn

                googleSignIn: async () => {

                    try {
                        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true }).then(() => {
                            console.log("google services are available")
                        }).catch((err) => {
                            console.error('play services are not available');
                        })

                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn()

                        // console.log("token:+++", idToken);

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken)

                        // Sign-in the user with the credential
                        return auth().signInWithCredential(googleCredential).then((user) => {
                            // console.log(user);
                        })

                    } catch (error) {
                        console.log(error.message);
                    }
                },

                // facebook login

                facebookLogin: async () => {
                    try {
                        // Attempt login with permissions
                        const result = await LoginManager.logInWithPermissions(["email", "public_profile", "user_friends"]);

                        if (result.isCancelled) {
                            throw 'User cancelled the login process';
                        }

                        // Once signed in, get the users AccesToken
                        const data = await AccessToken.getCurrentAccessToken();

                        if (!data) {
                            throw 'Something went wrong obtaining access token';
                        }

                        // Create a Firebase credential with the AccessToken
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(facebookCredential);

                    } catch (error) {
                        console.log("onFacebookButtonPress", error.message);
                    }
                },

                // twitter login

                twitter: async () => {
                    try {

                        RNTwitterSignIn.init(twitterApiKey, twitterApiKey2).then(() =>
                            console.log('Twitter SDK initialized'),
                        )

                        // Perform the login request
                        const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

                        // Create a Twitter credential with the tokens
                        const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

                        // Sign-in the user with the credential
                        return auth().signInWithCredential(twitterCredential);

                    } catch (error) {
                        console.log(error.message)
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider