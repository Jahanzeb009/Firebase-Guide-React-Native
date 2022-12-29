import { Text, StatusBar, ScrollView, View, Animated, Dimensions, Alert, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { LinkInButton } from '../../components/link'
import ShowIndicator from '../../components/ShowIndicator'
import SubBoxText from '../../components/boxText'
import { underline } from '../../components/underline'
import AnimatedHeaderWithImage from '../../components/animatedHeader'
import ImageModal from 'react-native-image-modal'
import { fontSize } from '../../components/fontSize'
import { firebase } from '@react-native-firebase/auth'
import { CustomButton2 } from '../../components/customButton'
import { CodeSnippet } from '../../components/codeSnippet'
import { BannerCloudMessaging } from '../../admob/adUnitId'
import Clipboard from '@react-native-clipboard/clipboard'
import toast from '../../components/toast'
import CollapsableCard from '../../components/collapsableCard'
import Title from '../../components/Title'
import YoutubePlayerCustom from '../../components/youtubePlayer'

const CM = ({ navigation }) => {
    const { colors, dark } = useTheme()

    let token = async () => {
        firebase.messaging().getToken().then(token => Alert.alert("FCM Token", token, [
            {
                text: 'copy',
                onPress: () => { Clipboard.setString(token), toast('copied') }
            },
            {
                text: 'okay',
                onPress: () => { }
            }
        ]))
    }

    let data1 = `import { firebase } from '@react-native-firebase/auth'
    
firebase.messaging().getToken().then(token => alert(token))`

    let data2 = `npm i @react-native-firebase/in-app-messaging @react-native-firebase/analytics`
    let data3 = `yarn add @react-native-firebase/in-app-messaging @react-native-firebase/analytics`

    let data4 = `// put this code where your screen first render like homeScreen / app.js in useEffect 
    messaging().onNotificationOpenedApp(remoteMessage => {
       alert('push notification from foreground')
      })`

    let data5 = `// put this code in index.js file
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // don't need to do anything in this function this is just for initialization for background /quit message
    })`

    let data6 = `// put this code where your screen first render like homeScreen / app.js in useEffect 
    messaging().getInitialNotification().then(remoteMessage => {
      alert('push notification from background/Quit')
      })`

    let data7 = `// put this code where your screen first render like homeScreen / app.js in useEffect 
    let onMessage = messaging().onMessage(async remoteMessage => {
        alert('push notification when user runing the app')
        })`

    const offset = useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

            <AnimatedHeaderWithImage animatedValue={offset} hh={175} ih={210} bg={'#0074bd'} source={require('../../../assets/header_images/cloud_messaging.png')} />

            <ScrollView showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                )} >
                <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

                    <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />

                </View>

                <SubBoxText color={'#ff53532f'} colorBG={colors.background} text={<Text>This module requires that the {underline("@react-native-firebase/app")} module is already setup and installed.</Text>} link={<LinkInButton b text={'@react-native-firebase/app'} navigation={'MainInstallation'} mt={5} />} />

                <SubBoxText title={'What is Cloud Messaging'} text={"Firebase Cloud Messaging is the tool used to send push notifications to single or a group of devices."} />

                <CodeSnippet data={data2} copyCommand={data2} mh={10} mv={5} />
                <Text style={{ flex: 1, alignSelf: 'center', color: colors.mainText }}>OR</Text>
                <CodeSnippet data={data3} copyCommand={data3} mh={10} mv={5} />

                <SubBoxText text={<Text>Use below codeSnippet to check Firebase Cloud Messaging (FCM) Token for your device</Text>}
                    code={<CodeSnippet data={data1} ViewHeight={100} copyCommand={data1} mh={-1} mv={5} />}
                    link0={<CustomButton2 title={'Show Your FCM Token'} onPress={() => token()} />}
                    text1={<Text>You can save this in your firestore or other your storage resources to send messaging to specific users using these token</Text>}
                />

                <LinkInButton b text={'Firebase Console'} link={'https://console.firebase.google.com/u/0/'} mt={5} mr={10} ml={10} mb={5} />
                <LinkInButton b text={'For more info check out in-app-messaging'} link={'https://rnfirebase.io/in-app-messaging/usage#installation'} mt={5} mr={10} ml={10} mb={5} />
                <LinkInButton b text={'For more info check out Analytics'} link={'https://rnfirebase.io/analytics/usage#installation'} mt={5} mr={10} ml={10} mb={5} />

                <CollapsableCard title={"Can't find Cloud Messaging tab?"} data={<SubBoxText text={'When you creating in-app-message second time you may not see In-app-messaging tab in Console sidemenu.\n\nThen go to Engage/Messaging tab from sidemenu and select New campaign\n\nAlso describe in this below picture'}
                    image0={<ImageModal
                        imageBackgroundColor={'transparent'}
                        removeClippedSubviews={true}
                        renderToHardwareTextureAndroid={true}
                        source={require('../../../assets/in_app_messaging/5.png')}
                        style={{ width: Dimensions.get('screen').width - 80, height: 155, borderRadius: 16, marginTop: 10 }}
                        resizeMode="contain"
                    />}
                />} />

                <Title text={'What does it do'} />
                <YoutubePlayerCustom id={'sioEY4tWmLI'} />

                <SubBoxText title={'Foreground state'} text={'Handle push notifications when your app is in foreground/ runing but in background'}
                    code={<CodeSnippet data={data4} ViewHeight={100} copyCommand={data4} mh={-1} mv={5} />}
                />
                <SubBoxText title={'Background/Quit state'} text={'Handle push notifications when your app is in background/ quit state'}
                    code={<CodeSnippet data={data5} ViewHeight={100} copyCommand={data5} mh={-1} mv={5} />}
                    code1={<CodeSnippet data={data6} ViewHeight={100} copyCommand={data6} mh={-1} mv={5} />}
                />

                <SubBoxText title={'App runing state'} text={'Handle push notifications when your app is runing by user'}
                    code={<CodeSnippet data={data7} ViewHeight={100} copyCommand={data7} mh={-1} mv={5} />}
                />

            </ScrollView>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerCloudMessaging />
            </View>
        </View>
    )
}


const CloudMessaging = () => {
    const [delay, setDelay] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setDelay(true)
        }, 1);
    }, [])

    if (!delay) {
        return <ShowIndicator />
    } else {
        return <CM />
    }

}

export default CloudMessaging