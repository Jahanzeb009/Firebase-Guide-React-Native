import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from './authProvider';
import { fontSize } from '../../components/fontSize';
import { CodeSnippet } from '../../components/codeSnippet';
import ShowIndicator from '../../components/ShowIndicator';
import { BannerAuthentication } from '../../admob/adUnitId';
import BN from '../../components/bottomNavigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const GoogleTest = () => {

    const { colors } = useTheme()

    const { googleSignIn, checkUser } = useContext(AuthContext)

    useEffect(() => {
        checkUser('UserScreen')
    }, [])

    const style = StyleSheet.create({
        TouchableOpacity: {
            padding: 5,
            borderColor: colors.border,
            borderRadius: 15,
            margin: 10,
            backgroundColor: colors.card
        },
    })

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={style.TouchableOpacity}
                    onPress={() =>
                        googleSignIn()
                    }
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Image source={require('../../../assets/icons/google.png')} style={{ width: 30, height: 30, resizeMode: 'contain', position: 'absolute', left: 10 }} />
                        <Text style={{ color: colors.mainText, textAlign: 'center', fontSize: 25 }}>Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                <BannerAuthentication />
            </View>
        </View>
    )
}

const Guide = () => {

    const { colors } = useTheme()

    const imports = `import { GoogleSignin } from '@react-native-google-signin/google-signin';`

    const configure = `useEffect(() => {
        GoogleSignin.configure({
            webClientId: '54xxxxxxxxxx403-ttglvkfxxxxxxxxxxxxpt9f7.apps.googleusercontent.com',
        })
    }, [])`

    const auth = `googleSignIn: async () => {

    try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true }).then(() => {
        console.log("google services are available")
        }).catch((err) => {
            console.error('play services are not available');
        })

    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn().catch((error) => {

    // Optional
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            alert('SIGN_IN_CANCELLED')
        } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('IN_PROGRESS')
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert('PLAY_SERVICES_NOT_AVAILABLE')
        }
    })
    // Optional

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential).then((user) => {
        console.log(user);
        })

    } catch (error) {
        console.log(error.message);
    }
}`

    const s = StyleSheet.create({
        textStyle: {
            fontSize: fontSize.mainTitle,
            paddingVertical: 10,
            backgroundColor: colors.card,
            padding: 10,
            marginBottom: 10,
            color: colors.mainText, paddingTop: StatusBar.currentHeight
        },
    });

    const [delay, setDelay] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setDelay(true)
        }, 300);

    }, [])

    if (!delay) {
        return <ShowIndicator />
    } else {
        return (
            <View style={{ flex: 1 }}>

                <ScrollView
                    style={{}}
                    stickyHeaderIndices={[0, 2, 4, 6]}
                    showsVerticalScrollIndicator={false}>
                    <View><Text style={s.textStyle}>Imports</Text></View>
                    <CodeSnippet data={imports}  copyCommand={imports}/>
                    <View><Text style={s.textStyle}>configure</Text></View>
                    <CodeSnippet data={configure}  copyCommand={configure}/>
                    <View><Text style={s.textStyle}>Usage</Text></View>
                    <CodeSnippet data={auth} copyCommand={auth} />
                </ScrollView>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                    <BannerAuthentication />
                </View>
            </View>
        )
    }
}


const GoogleAuth = () => {

    return (
        <BN fc={GoogleTest} sc={Guide} />
    );
}

export default GoogleAuth