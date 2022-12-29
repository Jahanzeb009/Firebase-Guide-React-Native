import { View, StyleSheet, StatusBar, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import CustomButton from '../../components/customButton'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from './authProvider'
import { TextInput } from 'react-native-paper'
import { fontSize } from '../../components/fontSize'
import { CodeSnippet } from '../../components/codeSnippet'
import ShowIndicator from '../../components/ShowIndicator'
import { BannerAuthentication } from '../../admob/adUnitId'
import BN from '../../components/bottomNavigation'

export const SignUpTest = () => {

    const { register, checkUser } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { colors } = useTheme()

    useEffect(() => {
        checkUser("UserScreen")
    }, [])

    const style = StyleSheet.create({
        emailInput: {
            width: '80%',
            backgroundColor: colors.background
        },
        passwordInput: {
            width: '80%',
            marginTop: 20,
            backgroundColor: colors.background
        },
    })

    const passwordRef = useRef()

    return (
        <View style={{ flex: 1, }} >
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', margin: 10, marginTop: 100 }} >
                <TextInput
                                    textColor={colors.mainText}
                    label={'Email'}
                    placeholder={"Enter Email"}
                    onChangeText={setEmail}
                    style={style.emailInput}
                    activeOutlineColor={colors.primary}
                    outlineColor={colors.border}
                    mode="outlined"
                    keyboardType="email-address"
                    onSubmitEditing={() => { passwordRef.current.focus() }}
                    blurOnSubmit={false}
                />
                <TextInput
                    label={'Password'}
                    placeholder={"Enter Password"}
                    textColor={colors.mainText}
                    onChangeText={setPassword}
                    style={style.passwordInput}
                    keyboardType="numeric"
                    activeOutlineColor={colors.primary}
                    outlineColor={colors.border}
                    mode="outlined"
                    ref={passwordRef}
                />
                <CustomButton
                    title="Sign Up"
                    bgStyle={{ marginTop: 30, }}
                    onPress={() => { register(email, password) }}
                />

            </View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                <BannerAuthentication />
            </View>
        </View>
    )
}


const Guide = () => {

    const { colors } = useTheme()

    const imports = `import auth from '@react-native-firebase/auth'`

    const Usage = `SignUp: async (email, password) => {
        
        try {
                await auth().createUserWithEmailAndPassword(email, password).then((val) => {
                toast("Account Created")
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
            <View style={{flex:1}}>

                <ScrollView
                    style={{ flex: 1 }}
                    stickyHeaderIndices={[0, 2, 4, 6]}
                    showsVerticalScrollIndicator={false}
                >
                    <View><Text style={s.textStyle}>Imports</Text></View>
                    <CodeSnippet data={imports} copyCommand={imports}/>
                    <View><Text style={s.textStyle}>Usage</Text></View>
                    <CodeSnippet data={Usage} />
                    {/* <View><Text style={s.textStyle}>AuthProvider</Text></View>
                    <CodeSnippet data={auth} ViewHeight={600} />
                    <View><Text style={s.textStyle}>StyleSheet</Text></View>
                    <CodeSnippet data={styles} ViewHeight={270} />
                    <View><Text style={s.textStyle}>Return( )</Text></View>
                    <CodeSnippet data={returnfun} ViewHeight={740} /> */}
                </ScrollView>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                    <BannerAuthentication />
                </View>
            </View>
        )
    }
}


const SignUpAuth = () => {

    return (
        <BN fc={SignUpTest} sc={Guide}/>
    );
}


export default SignUpAuth