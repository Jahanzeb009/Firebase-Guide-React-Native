import { Text, StatusBar, ScrollView, View, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { LinkInButton } from '../../components/link'
import { CodeSnippet } from '../../components/codeSnippet'
import ShowIndicator from '../../components/ShowIndicator'
import YoutubePlayerCustom from '../../components/youtubePlayer'
import SubBoxText from '../../components/boxText'
import Title from '../../components/Title'
import { underline } from '../../components/underline'
import AnimatedHeaderWithImage from '../../components/animatedHeader'
import ImageModal from 'react-native-image-modal'
import { fontSize } from '../../components/fontSize'
import CollapsableCard from '../../components/collapsableCard'
import { BannerInAppMessaging} from '../../admob/adUnitId'

const InAppMessaging = () => {

    const { colors, dark } = useTheme()

    let data1 = `npm i @react-native-firebase/in-app-messaging @react-native-firebase/analytics`
    let data2 = `yarn add @react-native-firebase/in-app-messaging @react-native-firebase/analytics`

    const title = (text, underline) => {
        return (
            <View style={{ backgroundColor: colors.card, paddingLeft: 10, marginBottom: 10, padding: 10, paddingTop: StatusBar.currentHeight, marginTop: 10 }}>
                <Text style={{ color: colors.mainText, fontWeight: 'bold', textDecorationLine: underline, fontSize: fontSize.mainTitle }}>{text}</Text>
            </View>
        )
    }

    const image = (image, h) => {
        return (
            <View >
                <ImageModal
                    imageBackgroundColor={'transparent'}
                    removeClippedSubviews={true}
                    renderToHardwareTextureAndroid={true}
                    source={image}
                    style={{ width: Dimensions.get('screen').width, height: h ? h : 195, borderRadius: 16 }}
                    resizeMode="contain" />
            </View>
        )
    }

    const subText = (text) => {
        return (
            <Text style={{ fontSize: fontSize.subtitle, color: colors.mainText, marginBottom: 10, marginLeft: 10 }}>{text}</Text>
        )
    }

    const offset = useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

            <AnimatedHeaderWithImage animatedValue={offset} hh={175} ih={210} bg={'#0074bd'} source={require('../../../assets/header_images/in_app_messaging.png')} />

            <ScrollView showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                )} stickyHeaderIndices={[11, 13, 15, 17]} >
                <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

                    <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />

                </View>

                <SubBoxText color={'#ff53532f'} colorBG={colors.background} text={<Text>This module requires that the {underline("@react-native-firebase/app")} module is already setup and installed.</Text>} link={<LinkInButton b text={'@react-native-firebase/app'} navigation={'MainInstallation'} mt={5} />} />

                <LinkInButton b text={'Firebase Console'} link={'https://console.firebase.google.com/u/0/'} mt={5} mr={10} ml={10} mb={5} />
                <LinkInButton b text={'For more info check out in-app-messaging'} link={'https://rnfirebase.io/in-app-messaging/usage#installation'} mt={5} mr={10} ml={10} mb={5} />
                <LinkInButton b text={'For more info check out Analytics'} link={'https://rnfirebase.io/analytics/usage#installation'} mt={5} mr={10} ml={10} mb={5} />

                <SubBoxText title={'What is In App Messaging'} text={"Firebase In-App Messaging helps you engage your app's active users by sending them targeted, contextual messages that encourage them to use key app features"} />
                <CodeSnippet data={data1} ViewHeight={60} copyCommand={data1} button />
                <CodeSnippet data={data2} ViewHeight={60} copyCommand={data2} button />

                <CollapsableCard title={'You may face issue'} data={<SubBoxText text={'When you creating in-app-message second time you may not see In-app-messaging tab in Console sidemenu.\n\nThen go to Engage/Messaging tab from sidemenu and select New campaign\n\nAlso describe in this below picture'}
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
                <YoutubePlayerCustom id={'5MRKpvKV2pg'} />

                {title('Step 1')}
                {image(require('../../../assets/in_app_messaging/1.png'), 194)}
                {title('Step 2')}
                {image(require('../../../assets/in_app_messaging/2.png'), 194)}
                {title('Step 3')}
                {image(require('../../../assets/in_app_messaging/3.png'), 194)}
                {title('Step 4')}
                {subText('Live preview , how its look in app, this is a card style layout')}
                {image(require('../../../assets/in_app_messaging/4.jpg'), 300)}

            </ScrollView>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerInAppMessaging/>
            </View>

        </View>
    )
}

const Indicator = () => {
    const [delay, setDelay] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setDelay(true)
        }, 1);
    }, [])

    if (!delay) {
        return <ShowIndicator />
    } else {
        return <InAppMessaging />
    }
}

export default Indicator