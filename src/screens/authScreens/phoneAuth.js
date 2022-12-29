import { View, Text, TouchableOpacity, StyleSheet, Keyboard, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import toast from '../../components/toast'
import CustomButton from '../../components/customButton'
import bold from '../../components/bold'
import { AuthContext } from './authProvider'
import { CodeSnippet } from '../../components/codeSnippet'
import { TextInput, } from 'react-native-paper'
import { fontSize } from '../../components/fontSize'
import ShowIndicator from '../../components/ShowIndicator'
import { BannerAuthentication } from '../../admob/adUnitId'
import BN from '../../components/bottomNavigation'

export const PhoneTest = () => {

    const { phoneLogin, setCode, phoneConfirm, confirm, checkUser } = useContext(AuthContext)

    const { colors } = useTheme()

    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        //if user already signed in then this code navigate us to the user screen until we press signout button
        checkUser("UserScreen")

    }, [])


    const style = StyleSheet.create({
        hint: {
            padding: 10,
            borderRadius: 16,
            marginVertical: 10,
            backgroundColor: colors.card,
            width: '80%'
        },
        secondView: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        TextInputStyle: {
            width: '80%',
            backgroundColor: colors.background,
        },
        bgStyle: {
            padding: 16,
            elevation: 3,
            alignItems: 'center',
            justifyContent: 'center',
        },
        confirmView: {
            marginTop: 10,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        confirmCodeStyle: {
            padding: 10,
            elevation: 3,
            marginTop: 10,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: '20%',
            backgroundColor: colors.primary,
        }
    })

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, justifyContent: 'center', margin: 10, alignItems: 'center' }}>
                <View style={style.hint}>
                    <Text style={{ fontWeight: 'bold', color: colors.mainText }}>Hint</Text>
                    <Text style={{ color: colors.subMainText }}>
                        {bold("Phone number :")} +923067200016{"\n"}
                        {bold("Comfirmation Code :")} 123456{"\n"}
                        You can create your own credentials
                    </Text>
                </View>
                <View style={style.secondView}>
                    <TextInput
                        maxLength={20}
                        textColor={colors.mainText}
                        keyboardType="phone-pad"
                        style={style.TextInputStyle}
                        onChangeText={setPhoneNumber}
                        placeholder={"Enter PhoneNumber"}
                        placeholderTextColor={colors.subMainText}
                        onSubmitEditing={() => { passwordRef.current.focus() }}
                        blurOnSubmit={false}
                        mode="outlined"
                        activeOutlineColor={colors.primary}
                        outlineColor={colors.border}
                    />

                </View>
                <CustomButton
                    activeOpacity={0.5}
                    title="Send code"
                    bgStyle={style.bgStyle}
                    onPress={() => {
                        if (phoneNumber.length <= 11) {
                            toast('please enter phone number')
                        } else { phoneLogin(phoneNumber), Keyboard.dismiss() }
                    }} />
                {confirm ?
                    <View style={style.confirmView}>
                        <TextInput
                            textColor={colors.mainText}
                            keyboardType="phone-pad"
                            placeholder={"Enter code"}
                            style={style.TextInputStyle}
                            onChangeText={text => setCode(text)}
                            placeholderTextColor={colors.subMainText}
                            onSubmitEditing={() => { passwordRef.current.focus() }}
                            blurOnSubmit={false}
                            mode="outlined"
                            activeOutlineColor={colors.primary}
                            outlineColor={colors.border}
                        />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={style.confirmCodeStyle}
                            onPress={() => phoneConfirm()}
                        >
                            <Text style={{ textAlign: 'center', color: colors.mainText }} >SIGN IN</Text>
                        </TouchableOpacity>
                    </View> : null}
            </View >

            <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                <BannerAuthentication />
            </View>

        </View >
    )
}


const Guide = () => {

    const { colors } = useTheme()

    const imports = `import auth from '@react-native-firebase/auth'`

    const fun = `phoneLogin: async (phoneNumber) => {
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
    }`

    const completeUsage = `const { phoneLogin, setCode, phoneConfirm, confirm, checkUser } = useContext(AuthContext)
    
    const [phoneNumber, setPhoneNumber] = useState('')

    return(
    < TextInput
            keyboardType="phone-pad"
            onChangeText={setPhoneNumber}
            onSubmitEditing={() => { passwordRef.current.focus() }}
        />
        < Button
            title="Send code"
            onPress={() => {
                phoneLogin(phoneNumber)
                Keyboard.dismiss()
            }} />
        {
            confirm ?
                <View >
                    <TextInput
                        keyboardType="phone-pad"
                        placeholder={"Enter code"}
                        onChangeText={text => setCode(text)}
                        onSubmitEditing={() => { passwordRef.current.focus() }}
                    />
                    <TouchableOpacity onPress={() => phoneConfirm()}>
                        <Text>SIGN IN</Text>
                    </TouchableOpacity>
                </View> : null
        }
    )`


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
                    stickyHeaderIndices={[0, 2, 4, 6]}
                    showsVerticalScrollIndicator={false}
                >
                    <View><Text style={s.textStyle}>Imports</Text></View>
                    <CodeSnippet data={imports} copyCommand={imports} />
                    <View><Text style={s.textStyle}>Usage</Text></View>
                    <CodeSnippet data={fun} copyCommand={fun} />
                    <View><Text style={s.textStyle}>completeUsage</Text></View>
                    <CodeSnippet data={completeUsage} copyCommand={completeUsage} />
                    {/* <View><Text style={s.textStyle}>StyleSheet</Text></View>
                    <CodeSnippet data={styles} ViewHeight={1110} />
                    <View><Text style={s.textStyle}>Return( )</Text></View>
                    <CodeSnippet data={returnfun} ViewHeight={1200} /> */}
                </ScrollView>

                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                    <BannerAuthentication />
                </View>

            </View>
        )
    }
}


const PhoneAuth = () => {

    return (
        <BN fc={PhoneTest} sc={Guide} />
    )
}

export default PhoneAuth