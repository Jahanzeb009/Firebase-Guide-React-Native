import { View, StatusBar, TextInput, StyleSheet, ScrollView, Vibration, FlatList, Animated, Dimensions, Image, Linking, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Button, IconButton, TouchableRipple } from 'react-native-paper'
import { useTheme } from '@react-navigation/native'
import SubBoxText from '../components/boxText'
import { LinkInButton } from '../components/link'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import toast from '../components/toast'
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { BannerHomeScreen } from '../admob/adUnitId'
import SplashScreen from "react-native-splash-screen";
import { TestIds, useAppOpenAd } from 'react-native-google-mobile-ads'
import axios from 'axios'
import OneSignal from 'react-native-onesignal'
import pushNotification from '../pushNotification/pushNotification'

function Welcome({ navigation }) {

  useEffect(() => {
    messaging().getToken().then(token => {
      firestore().collection('userTokens').get().then(data => {
        let tokenCheck = data.docs.map(val => {
          return val.data().token
        })

        if (tokenCheck.includes(token)) { } else {
          firestore().collection('userTokens').add({
            token: token
          })
        }
      })
    })
  }, [])


  useEffect(() => {

    // Listen DynamicLinks
    const handleDynamicLink = link => {

      // this link.url is deeplink which you put while creating dynamicLink in console
      if (link?.url === 'https://rnfirebaseguide.page.link/Libraries') {
        toast('opening link...')
        navigation.navigate("Libraries")
      }
    }

    // for Foreground App link listen
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink)

    // for Background/Quit app link lister
    const unsubscribe2 = dynamicLinks().getInitialLink().then(link => {
      // this link.url is deeplink which you put while creating dynamicLink in console
      if (link?.url === 'https://rnfirebaseguide.page.link/Libraries') {
        toast('opening link...')
        navigation.navigate("Libraries")
      }
    })

    // cloud_messaging
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    // jab app open hogi but os ko minimize kiya ho ga tab ye run ho ga
    // assume app runing in the background
    // foreground
    let onNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {

      alert('notification minimized')

      if (remoteMessage.data) {
        if (remoteMessage.data.screenName !== '') {
          navigation.navigate(remoteMessage.data.screenName);
        } else if (remoteMessage.data.url !== '') {
          Linking.openURL(remoteMessage.data.url)
        }
      }
    })

    // // Check whether an initial notification is available
    // will run when app in quit mode
    let getInitialNotification = messaging().getInitialNotification().then(remoteMessage => {

      alert('notification from quit state')

      if (remoteMessage.data) {
        if (remoteMessage.data.screenName !== '') {
          navigation.navigate(remoteMessage.data.screenName);
        } else if (remoteMessage.data.url !== '') {
          Linking.openURL(remoteMessage.data.url)
        }
      }
    })

    // Background & Quit state messages
    // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //   // console.log('background message received')
    //   alert('background chal gaya//....')
    // })

    // jab app run ho gi means user use kr rha ho ga tab ye push notification show nhe ho ga just remoteMessage ky ander jo ho ga wo show kr dy 
    let onMessage = messaging().onMessage(async remoteMessage => {
      // bad me is me kuch addon add krny hen
      // Alert.alert('A new FCM message arrived! kuch bhi', JSON.stringify(remoteMessage.data))
      console.log('n', remoteMessage)
      if (remoteMessage.data) {
        if (remoteMessage.data.screenName !== '') {

          Alert.alert('Tips', remoteMessage.data.description, [{ text: 'Cancel' }, {
            text: "let's go", onPress: () => navigation.navigate(remoteMessage.data.screenName)
          }])

        } else if (remoteMessage.data.url !== '') {

          Alert.alert('Update', remoteMessage.data.description, [{ text: 'Cancel' }, {
            text: 'New Update', onPress: () => Linking.openURL(remoteMessage.data.url)
          }])

        }
      }
    })

    SplashScreen.hide(); //hides the splash screen on app load.

    return () => {
      unsubscribe  // in-app messaging
      unsubscribe2  // in-app messaging

      // cloud_messaging
      onNotificationOpenedApp
      getInitialNotification
      onMessage
    }

  }, [])

  const { colors, dark } = useTheme()
  const [userInput, setUserInput] = useState('')
  const [mr, setMr] = useState('')
  const [hour, setHour] = useState('')

  let b = () => <SubBoxText style={{ elevation: 0 }} mH={-1} mV={-1} text={'Firebase provides lots of features free of cost, check it out'} link={<LinkInButton text={'Pricing'} link={'https://firebase.google.com/pricing?authuser=0&hl=en'} mt={10} b tf />} />

  const data = [
    { bgColor: '#3571b8', image: require("../../assets/welcome/get_started.png"), onPress: "MainInstallation" },
    { bgColor: '#9f1aa6', image: require("../../assets/welcome/authentication.png"), onPress: "Authentication" },
    { bgColor: '#f57c00', image: require("../../assets/welcome/firestore.png"), onPress: "Firestore" },
    { bgColor: '#00a1b3', image: require("../../assets/welcome/storage.png"), onPress: "Storage" },
    { bgColor: '#303232', image: require("../../assets/welcome/security_rules.png"), onPress: "Security Rules" },
    { bgColor: '#047a6f', image: require("../../assets/welcome/test_lab.png"), onPress: "TestLab", },
    { bgColor: '#2c75e2', image: require("../../assets/welcome/app_distribution.png"), onPress: "AppDistribution" },
    { bgColor: '#2377ea', image: require("../../assets/welcome/in_app_messaging.png"), onPress: "InAppMessaging" },
    { bgColor: '#2377ea', image: require("../../assets/welcome/cloud_messaging.png"), onPress: "CloudMessaging" },
    { bgColor: '#ff1866', image: require("../../assets/welcome/dynamic_links.png"), onPress: "DynamicLinks" },
    { button: b() }
  ]

  const styles = StyleSheet.create({
    welcomeText: {
      flex: 1,
      fontWeight: 'bold',
      color: colors.mainText
    },
    hello: {
      fontWeight: 'bold', color: colors.mainText, justifyContent: 'center', alignItems: 'center'
    },
    mrText: {
      fontWeight: 'bold', color: colors.mainText
    },
    flatListTouchableOpacity: {
      margin: 5,
      borderRadius: 10,
      backgroundColor: colors.background,
    },
    flatListView: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    }
  })

  useEffect(() => {
    AsyncStorage.getItem('mr').then(val => {
      setMr(val)
    })
  }, [mr])

  // get date
  useEffect(() => {

    let hr = new Date().getHours()

    if (hr >= 6 && hr < 12) {
      setHour("Good Morning!")
    } else if (hr == 12) {
      setHour("Good Noon!")
    } else if (hr >= 12 && hr <= 17) {
      setHour("Good Afternoon!")
    } else {
      setHour("Good Evening!")
    }
  }, [hour])

  let offset = useRef(new Animated.Value(0)).current

  const insets = useSafeAreaInsets()

  const { width } = Dimensions.get('window')

  let w = width.toFixed(0)

  let wmax = w > 400 ? 40 : w >= 360 ? 30 : width * 0.10
  let wmin = w > 400 ? 30 : w >= 360 ? 22 : width * 0.08

  let text = offset.interpolate({
    inputRange: [1, 500 + insets.top],
    outputRange: [wmax, wmin],
    extrapolate: 'clamp'
  })

  const OpenAppAd = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-4551497516413603/6622283554'

  const { isLoaded, load, show } = useAppOpenAd(OpenAppAd, {
    requestNonPersonalizedAdsOnly: true,
  });

  // let Push = () => {
  //   fetch("https://4ce5-39-52-4-128.ngrok.io/send-noti", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: {
  //       token: "fsuaupNfRAiES9qRuYbZE1:APA91bEPhq-Erq0snC_u6DQx6zcur8zTaLn70bj_T-Qu2RbiOWBszw9qEAgkZYF3VRL9r0YTaFlVm3Ws0FnKyG2ltWrpQDDRFrdHjckFqP-g1tClC_4ucMlnexhuawgQFBne52wtkGvc"
  //     }
  //   })
  // }



  // const API_KEY = "MjJjM2NjZjEtNzgwZS00NDg3LWIwMzgtNDI1NWMzNmFiMzkz";
  // const ONESIGNAL_APP_ID = "52ece736-eaeb-479c-9fc6-3d5fda5e71cc";
  // const BASE_URL = "https://onesignal.com/api/v1";

  // const optionsBuilder = (method, path, body) => {
  //   return {
  //     method,
  //     'url': `${BASE_URL}/${path}`,
  //     'headers': {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Basic ${API_KEY}`,
  //     },
  //     body: body ? JSON.stringify(body) : null
  //   };
  // }

  // const createNotication = async (data) => {
  //   const options = optionsBuilder("post", "notifications", data);
  //   try {
  //     const response = await axios(options);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     return error;
  //   }
  // }

  // const body = {
  //   app_id: ONESIGNAL_APP_ID,
  //   included_segments: ['Subscribed Users'],
  //   data: {
  //     foo: 'bar',
  //   },
  //   contents: {
  //     en: 'Sample Push Message',
  //   },
  // };

  // let send = () => createNotication(body)

  // OneSignal.getDeviceState().then(v=>{
  //   console.log(v.userId)
  // })




  // useEffect(() => {
  //   // Start loading the interstitial straight away
  //   load();

  //   if (isLoaded) {
  //     show()
  //   }
  // }, [load]);

  // if (isLoaded) {
  //   return show()
  // } else {

  return (
    <>
      <Animated.View style={{ backgroundColor: colors.card, paddingBottom: 5 }}>
        <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: StatusBar.currentHeight, marginHorizontal: 10 }}>
          <Animated.Text adjustsFontSizeToFit style={[styles.welcomeText, { fontSize: text, }]} numberOfLines={1}>{hour}</Animated.Text>
          <IconButton icon={'backburger'} iconColor={colors.mainText} mode='contained' style={{ backgroundColor: colors.background }} onPress={() => { Vibration.vibrate(40), navigation.openDrawer() }} />
        </View>

        <View style={[{ paddingHorizontal: 10, flexDirection: 'row' }]}>
          <Animated.Text adjustsFontSizeToFit style={[styles.hello, { fontSize: text }]}>Hello, </Animated.Text>

          {mr == null || '' ? <TextInput
            placeholder='Name ?'
            placeholderTextColor={colors.border}
            activeOutlineColor={colors.background}
            outlineColor={colors.background}
            selectionColor={colors.primary}
            onChangeText={setUserInput}
            onSubmitEditing={() => {
              AsyncStorage.setItem('mr', userInput)
              setMr(userInput)
            }}
            style={{ flex: 1, borderRadius: 10, paddingHorizontal: 10, color: colors.mainText, padding: 0, fontWeight: 'bold', backgroundColor: colors.background }}
            mode={'outlined'}
            theme={{ colors: { onSurface: colors.mainText } }} /> : <Animated.Text numberOfLines={1} ellipsizeMode='tail' style={[styles.mrText, { flex: 1, fontSize: text }]}>{mr}</Animated.Text>}

        </View>

      </Animated.View>
      <Button onPress={() => navigation.navigate('AdminPanel')} >Push Notification</Button>
      <ScrollView showsVerticalScrollIndicator={false} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], { useNativeDriver: false })}>

        <View style={{ marginTop: 5 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              let width = Dimensions.get('window').width - 10
              return (
                <TouchableRipple borderless rippleColor={item.bgColor}
                  onPress={() => {
                    if (item.onPress) {
                      navigation.navigate(item.onPress)
                    }
                    Vibration.vibrate(40)
                  }} style={{ margin: 5, borderRadius: 24, shadowColor: colors.mainText + 60, elevation: 3 }}
                >
                  <>
                    {item.image && <Image source={item.image} style={{ width: width, height: width * 0.25 }} resizeMode="cover" />}
                    {item.button && b()}
                  </>
                </TouchableRipple>
              )
            }} />

        </View>
      </ScrollView>



      <View style={{ alignItems: 'center' }}>

        <BannerHomeScreen />

      </View>
    </>
  )
  // }
}

export default Welcome;



// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'

// const LifeCycle = () => {

//     console.log('1st outside from useEffect()')

//     useEffect(() => {
//         console.log('3rd componentDidUpdate')
//     }) // similar to componentDidUpdate, ye jasy hi state me ya khai bhi koi data ya value update ho gi tab ye execute hoga

//     useEffect(() => {
//         console.log('4th componentDidMount')
//     }, []) // similar to componentDidMount, ye jsy hi [] me specific object me changes ho gi tab execute hoga

//     useEffect(() => {
//         //   console.log('4th')
//         return console.log('5th componentWillUnmount')

//     }, []) // similar to componentWillUnmount

//     return (
//         <View>
//             <Text>{console.log("2nd in return ()")}</Text>
//         </View>
//     )
// }

// export default LifeCycle