import { Text, StatusBar, Animated, ScrollView, View, FlatList, Image, TouchableOpacity, Vibration } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { LinkInButton } from '../../components/link'
import { CodeSnippet } from '../../components/codeSnippet'
import ShowIndicator from '../../components/ShowIndicator'
import YoutubePlayerCustom from '../../components/youtubePlayer'
import SubBoxText from '../../components/boxText'
import { underline } from '../../components/underline'
import Title from '../../components/Title'
import AnimatedHeaderWithImage from '../../components/animatedHeader'
import { IconButton } from 'react-native-paper'
import { BannerAuthentication } from '../../admob/adUnitId'
import { fontSize } from '../../components/fontSize'

const SubAuthentication = () => {
  const { colors, dark } = useTheme()

  const offset = useRef(new Animated.Value(0)).current;

  const auth = [
    { appName: 'Email', appIcon: 'email-variant', background: '#00A699', },
    { appName: 'Google', appIcon: require('../../../assets/icons/google.png'), background: '#DB4437', },
    { appName: 'Facebook', appIcon: 'facebook', background: '#4267B2', },
    { appName: 'PhoneNumber', appIcon: 'phone-message', background: '#90c257', },
    { appName: 'ForgetPassword', appIcon: 'form-textbox-password', background: '#00A4EF', },
    { appName: 'SignUp', appIcon: 'account-arrow-right', background: '#FFB900', },
    { appName: 'Twitter', appIcon: 'twitter', background: '#1DA1F2', },
    { appName: 'Anonymous', appIcon: 'account', background: '#00a64b', },
  ]

  const navigation = useNavigation()

  return (
    <View style={{ flex: 1 }}>
      <AnimatedHeaderWithImage animatedValue={offset} hh={175} ih={200} bg={'#ae3599'} source={require('../../../assets/header_images/authentication.png')} />
      <ScrollView showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )} >
        <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

          <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />

          <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

          <SubBoxText color={'#ff53532f'} text={<Text>This module requires that the {underline("@react-native-firebase/app")} module is already setup and installed.</Text>} link={<LinkInButton b tf text={'@react-native-firebase/app'} navigation={'MainInstallation'} mt={5} />} />
          <SubBoxText text={<Text>For Authentication we need one more module you have to install it. {underline("@react-native-firebase/auth")}</Text>} />
          <CodeSnippet data={'npm i @react-native-firebase/auth'} ViewHeight={50} copyCommand={'npm i @react-native-firebase/auth'} button />

          <SubBoxText title={'Addons'} text={"Attention!!!\n\nI use contextApi from all these below options for better code reuseablity\n\nYou can check out this in my git repository\n\npath: src/screen/authScreens/authProvider.js\n\nAnd it's implementation is every below screen and it's wrapper in my app.js file "}
            link={<LinkInButton text={"Open GitHub"} link={'https://github.com/Jahanzeb009/Firebase-Guide-React-Native/tree/main/src/screens/authScreens'} mt={10} />}
          />
          <View style={{ margin: 5 }}>
            <FlatList
              data={auth}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => { navigation.navigate(item.appName), Vibration.vibrate(40) }} activeOpacity={0.6} style={{ backgroundColor: item.background + 40, flex: 1, aspectRatio: 1, borderRadius: 16, margin: 5, alignItems: 'center', justifyContent: 'center', borderColor: item.background + 50, borderWidth: 2 }}>
                    <View style={{ flex: .6, justifyContent: 'center', alignItems: 'center' }}>
                      {item.appName === "Google" ? <Image source={require('../../../assets/icons/google.png')} style={{ width: 25, height: 25, resizeMode: 'contain', }} />
                        : <IconButton icon={item.appIcon} size={30} iconColor={item.background} style={{ margin: 0, padding: 0 }} />}
                    </View>
                    <Text style={{ flex: .4, color: colors.mainText, textAlign: 'center', fontSize: fontSize.body }} adjustsFontSizeToFit>{item.appName === 'ForgetPassword' ? 'Forget Password' : item.appName === "PhoneNumber" ? 'Phone Number' : item.appName}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
          <Title text={'What does it sdo'} />
          <YoutubePlayerCustom id={'8sGY55yxicA'} />

        </View>
      </ScrollView>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <BannerAuthentication />
      </View>

    </View>
  )
}


const Authentication = () => {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 1);

  }, [])

  if (!delay) {
    return <ShowIndicator />
  } else {
    return <SubAuthentication />
  }

}
export default Authentication



