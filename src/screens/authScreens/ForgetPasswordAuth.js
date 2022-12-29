import { View, StyleSheet, ScrollView, Text, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from './authProvider'
import CustomButton from '../../components/customButton'
import toast from '../../components/toast'
import { TextInput } from 'react-native-paper'
import { CodeSnippet } from '../../components/codeSnippet'
import { fontSize } from '../../components/fontSize'
import ShowIndicator from '../../components/ShowIndicator'
import { BannerAuthentication } from '../../admob/adUnitId'
import BN from '../../components/bottomNavigation'

export const ForgetPasswordTest = () => {

  const { colors } = useTheme()

  const [email, setEmail] = useState('')

  const { forgetPassword } = useContext(AuthContext)

  const style = StyleSheet.create({
    emailInput: {
      width: '80%',
      backgroundColor: colors.background
    },
  })

  const emailRef = useRef()

  return (
    <View style={{ flex: 1, margin: 10 }} >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10 }} >
        <TextInput
          onChangeText={setEmail}
          label={"Email"}
          style={style.emailInput}
          placeholder={"Email"}
          keyboardType="email-address"
          placeholderTextColor={colors.subMainText}
          activeOutlineColor={colors.primary}
          outlineColor={colors.border}
          mode="outlined"
          ref={emailRef}
          textColor={colors.mainText}
        />
        <CustomButton
          title="Rest Email"
          bgStyle={{ marginTop: 30 }}
          onPress={() => {
            if (email.length <= 6) {
              emailRef.current.focus()
              toast("Enter your email properly")
            } else {
              forgetPassword(email)
            }
          }}
        />

      </View >

      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
        <BannerAuthentication />
      </View>

    </View >
  )
}


const Guide = () => {

  const { colors } = useTheme()

  const imports = `import auth from '@react-native-firebase/auth'`

  const Usage = `forgetPassword: async (email) => {

      try {
          await auth().sendPasswordResetEmail(email)
          toast('email Sent')
      } catch (error) {
          console.log(error.message);
      }
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
      paddingTop:StatusBar.currentHeight
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
          <View><Text style={s.textStyle}>Usage </Text></View>
          <CodeSnippet data={Usage} copyCommand={Usage} />
        </ScrollView>
        <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
          <BannerAuthentication />
        </View>
      </View>
    )
  }
}


const ForgetPasswordScreen = () => {

  return (
    <BN fc={ForgetPasswordTest} sc={Guide} />
  );
}

export default ForgetPasswordScreen