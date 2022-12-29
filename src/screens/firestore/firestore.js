import { Text, StatusBar, ScrollView, View, Animated, FlatList, TouchableOpacity, Image, Vibration } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { LinkInButton } from '../../components/link'
import { CodeSnippet } from '../../components/codeSnippet'
import ShowIndicator from '../../components/ShowIndicator'
import YoutubePlayerCustom from '../../components/youtubePlayer'
import SubBoxText from '../../components/boxText'
import Title from '../../components/Title'
import { underline } from '../../components/underline'
import AnimatedHeaderWithImage from '../../components/animatedHeader'
import { BannerCloudFirestore } from '../../admob/adUnitId'
import { IconButton } from 'react-native-paper'
import { fontSize } from '../../components/fontSize'

const SubFirestore = () => {

  const { colors, dark } = useTheme()

  const { navigate } = useNavigation()

  let data1 = `npm i @react-native-firebase/firestore`
  let data2 = `yarn add @react-native-firebase/firestore`

  const offset = useRef(new Animated.Value(0)).current;

  const auth = [
    { appName: 'Read Data', press: 'ReadData', appIcon: 'message-badge', background: '#ddaf25', },
    { appName: 'Write Data', press: 'WriteData', appIcon: 'typewriter', background: '#ca431d', },
    { appName: 'Query Data', press: 'Query', appIcon: 'database-search', background: '#285ebb', },
    { appName: 'Transaction Data', press: 'Transaction', appIcon: 'lightning-bolt', background: '#FF81D0', },
    { appName: 'Other', press: 'Other', appIcon: 'form-textbox-password', background: '#90A19D', },
    { background: colors.background },
    { background: colors.background },
    { background: colors.background },
  ]

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

      <AnimatedHeaderWithImage animatedValue={offset} hh={175} ih={200} bg={'#ff8d00'} source={require('../../../assets/header_images/firestore.png')} />

      <ScrollView showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )} >
        <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

          <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />


          <SubBoxText color={'#ff53532f'} text={<Text>This module requires that the {underline("@react-native-firebase/app")} module is already setup and installed.</Text>} link={<LinkInButton b text={'@react-native-firebase/app'} navigation={'MainInstallation'} mt={5} />} />

          <SubBoxText color={colors.card} title={'What is Firestore'} text={'Firestore is a flexible, scalable NoSQL cloud database to store and sync data. It keeps your data in sync across client apps through realtime listeners and offers offline support so you can build responsive apps that work regardless of network latency or Internet connectivity.'} />

          <CodeSnippet data={data1} ViewHeight={60} copyCommand={data1} button />
          <CodeSnippet data={data2} ViewHeight={60} copyCommand={data2} button />

          <SubBoxText color={colors.card} title={'Addons'} />
          <View style={{ margin: 5 }}>
            <FlatList
              data={auth}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => {
                    if (item.appName) {
                      navigate(item.press)
                      Vibration.vibrate(40)
                    }
                  }} activeOpacity={0.6} style={{ backgroundColor: item.background + 40, flex: 1, aspectRatio: 1, borderRadius: 16, margin: 5, alignItems: 'center', justifyContent: 'center', borderColor: item.background + 50, borderWidth: 2 }}>
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


          <Title text={'What does it do'} />
          <YoutubePlayerCustom id={'QcsAb2RR52c'} />
        </View>
      </ScrollView>
      <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
        <BannerCloudFirestore />
      </View>
    </View>
  )
}

const Firestore = () => {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 1);
  }, [])

  if (!delay) {
    return <ShowIndicator />
  } else {
    return <SubFirestore />
  }

}


export default Firestore