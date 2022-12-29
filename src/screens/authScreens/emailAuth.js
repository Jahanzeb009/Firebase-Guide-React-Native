import { View, StyleSheet, StatusBar, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'

import CustomButton from '../../components/customButton'
import { AuthContext } from './authProvider'
import { TextInput } from 'react-native-paper'
import { CodeSnippet } from '../../components/codeSnippet'
import { fontSize } from '../../components/fontSize'
import ShowIndicator from '../../components/ShowIndicator'
import { BannerAuthentication } from '../../admob/adUnitId'
import BN from '../../components/bottomNavigation'

export const EmailTest = () => {

    const { colors } = useTheme()

    const { login, checkUser } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        //if user already signed in then this code navigate us to the user screen until we press signout button
        checkUser("UserScreen")
    }, [])

    const style = StyleSheet.create({
        emailInput: {
            width: '80%',
            backgroundColor: colors.background,
        },
        passwordInput: {
            width: '80%',
            marginTop: 20,
            backgroundColor: colors.background,
            borderRadius: 16,
            color: colors.mainText,
            borderColor: colors.border,
        },
    })

    const passwordRef = useRef()

    return (
        <FirstContextProvider>
            <View style={{ flex: 1 }}>

                <View View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', margin: 10, marginTop: 100 }} >

                    <TextInput
                        label={'Email'}
                        onChangeText={setEmail}
                        style={style.emailInput}
                        placeholder={"Email"}
                        keyboardType="email-address"
                        placeholderTextColor={colors.subMainText}
                        onSubmitEditing={() => { passwordRef.current.focus() }}
                        blurOnSubmit={false}
                        mode="outlined"
                        activeOutlineColor={colors.primary}
                        outlineColor={colors.border}
                        theme={{ colors: { onSurface: colors.mainText } }}
                        textColor={colors.mainText}
                    />
                    <TextInput
                        label={'Password'}
                        textColor={colors.mainText}
                        ref={passwordRef}
                        keyboardType="numeric"
                        onChangeText={setPassword}
                        style={style.passwordInput}
                        placeholder={"Password"}
                        placeholderTextColor={colors.subMainText}
                        activeOutlineColor={colors.primary}
                        outlineColor={colors.border}
                        mode="outlined"
                    />
                    <CustomButton
                        title="Sign in"
                        bgStyle={{ marginTop: 30, }}
                        onPress={() => {
                            login(email, password)
                        }}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <BannerAuthentication />
                </View>
            </View >
        </FirstContextProvider>
    )
}

const Guide = () => {

    const { colors } = useTheme()

    const imports = `import auth from '@react-native-firebase/auth'`

    const auth = `login: async (email, password) => {
        try {
            await auth().signInWithEmailAndPassword(email, password)
            toast('Signing...')
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
            color: colors.mainText,
            paddingTop: StatusBar.currentHeight
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
                    style={{ flex: 1 }}
                    stickyHeaderIndices={[0, 2, 4, 6, 8]}
                    showsVerticalScrollIndicator={false}>

                    <View><Text style={s.textStyle}>Imports</Text></View>
                    <CodeSnippet data={imports} />

                    <View><Text style={s.textStyle}>Usage</Text></View>
                    <CodeSnippet data={auth} />

                </ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <BannerAuthentication />
                </View>
            </View>
        )
    }
}


const EmailAuth = () => {

    return (
        <BN fc={EmailTest} sc={Guide} />
    );
}

export default EmailAuth