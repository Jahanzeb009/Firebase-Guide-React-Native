import { View, Text, ScrollView, StatusBar, Animated, Image, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { underline } from '../../components/underline';
import bold from '../../components/bold';
import { LinkInButton, linkInText } from '../../components/link';
import ShowIndicator from '../../components/ShowIndicator';
import AnimatedHeaderWithImage from '../../components/animatedHeader';
import SubBoxText from '../../components/boxText';
import { CodeSnippet } from '../../components/codeSnippet';
import Title from '../../components/Title';
import { BannerGetStarted } from '../../admob/adUnitId';
import Credits from '../welcomeDrawerScreens/credits';

const MainInstallation = () => {

    const { height, width } = Dimensions.get('window')

    let wmax = width.toFixed(0) > 400 ? 40 : width.toFixed(0) >= 360 ? 30 : width * 0.10

    const { colors, dark } = useTheme()

    let data1 = `npm i @react-native-firebase/app`
    let data2 = `yarn add @react-native-firebase/app`

    let data3 = `buildscript {
    dependencies {
        ...
        classpath 'com.google.gms:google-services:4.3.13'
        ...
    }
}`

    let data4 = `apply plugin: 'com.google.gms.google-services'`
    let data5 = `npx react-native run-android`
    let data6 = `npx react-native start`
    let data7 = `cd android && ./gradlew signingReport`
    let data8 = `Variant: debugAndroidTest
Config: debug
Store: D:\ <projectName>\ android\ app\ mykey.keystore
Alias: my-key-alias
MD5: A6:84:CD:1B:29:9B:92:AA:30:CC:AD:49:BE:CD:C4:7B
SHA1: 89:17:2A:C5:CF:34:09:EE:BA:46:D5:FB:FD:51:16:DE:98:B2:96:FF
SHA-256: 66:2D:E3:46:02:28:77:AB:88:99:6F:0F:AG:8D:D9:CA:46:E6:FF:7A:7A:49:46:16:12:B5:6E:AC:78:F0:F2:99
Valid until: Friday, January 21, 2050`

    const offset = useRef(new Animated.Value(0)).current;

    const [delay, setDelay] = useState('indicator',)

    useEffect(() => {
        setTimeout(() => {
            setDelay('data')
        }, 300);

    }, [])

    let Data = () => <View>
        <AnimatedHeaderWithImage animatedValue={offset} hh={190} ih={200} bg={'#0084cb'} source={require('../../../assets/header_images/main_installation.png')} />

        <ScrollView showsVerticalScrollIndicator={false} onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
        )} stickyHeaderIndices={[3, 5, 7, 9, 11, 13, 15]} >
            <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

                <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />
            </View>

            <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

            <SubBoxText colorBG={colors.background} text={<Text>In this guide we use native code so we use react-native CLi (bare workflow) for {bold("android")} only</Text>}
                code={<LinkInButton text={'React-native-cli'} link={'https://reactnative.dev/docs/environment-setup'} mt={5} b tf />}
            />
            <Title text={'Step 1: Installation'} bg={colors.background} pt ml={20} />
            <SubBoxText text={'Install this dependency'}
                code={<CodeSnippet data={data1} mh={1} button copyCommand={data1} />}
                text1={<Text>OR</Text>} alignText1
                code1={<CodeSnippet data={data2} mh={1} button copyCommand={data2} />}
                Banner={<BannerGetStarted />}
            />

            <Title text={'Step 2 : Android Setup'} bg={colors.background} pt ml={20} />
            <SubBoxText text={<Text>Add this dependency inside of your {underline('/android/build.gradle')}</Text>}
                code={<CodeSnippet data={data3} mh={1} button copyCommand={"classpath 'com.google.gms:google-services:4.3.13'"} />}
                text1={<Text>Add this plugin inside of your {underline('/android/app/build.gradle')}</Text>}
                code1={<CodeSnippet data={data4} mh={1} button copyCommand={"apply plugin: 'com.google.gms.google-services'"} />}
                Banner={<BannerGetStarted />}
            />

            <Title text={'Step 3 : Run your project'} bg={colors.background} pt ml={20} />
            <SubBoxText
                text1={'If you face any error related to Metro just check your metro bundler is running. If not than use this command'}
                code={<CodeSnippet data={data5} mh={1} button copyCommand={"npx react-native run-android"} />}
                code1={<CodeSnippet data={data6} mh={1} button copyCommand={"npx react-native start"} />}
                image={<Image source={require('../../../assets/mainInstallation/npx_run_start2.png')} style={{ resizeMode: 'contain', height: 95, width: '100%', borderRadius: 16 }} />}
                Banner={<BannerGetStarted />}
            />

            <Title text={'Step 4 : Generating SHA-1 / SHA-256 key Certificate'} bg={colors.background} pt ml={20} />
            <SubBoxText text={<Text>Run this command {underline('cd android && ./gradlew signingReport')}</Text>}
                code={<CodeSnippet data={data7} mh={1} button copyCommand={data7} />}
                text1={<Text>After above command run you will see these SHA1 && SHA256 Certificate based on your application</Text>}
                code1={<CodeSnippet data={data8} mh={1} button />}
                text2={<Text>If you face any issue related this keystore click below button</Text>}
                link2={<LinkInButton text={'Read more about .keystore file'} navigation={'keyCertificate'} tf b mt={10} />}
                Banner={<BannerGetStarted />} BannerTop={10}
            />

            <Title text={'Step 5 : Firebase console'} bg={colors.background} pt ml={20} />
            <SubBoxText text={<Text>1. After successfully getting SHA certificate go to the Firebase console and {linkInText("create new project", '', 'https://console.firebase.google.com/')}or add an existing projet {underline("Package Name")} and these {underline("SHA-1 & SHA-256 certificates")}</Text>}
                text1={<Text>2. Download {underline("google-services.json")} and put in your {underline("./android/app/")}</Text>}
                text2={<Text>3. Authentication tab & select {underline("Sign-in method")} and allow services you want in your app</Text>}
                link2={<LinkInButton text={'Read more'} navigation={'firebaseConsole'} tf b mt={10} />}
                Banner={<BannerGetStarted />} BannerTop={5}
            />

            <Title text={'Step 6 : Open Android Studio (optional)'} bg={colors.background} pt ml={20} />
            <SubBoxText
                text={<Text>1. After doing above all setup successfully, open {underline("android studio")} and select your {underline("<projectname>/android")} and wait for a bit.</Text>}
                text1={<Text>2. {underline("Android studio")} will configure all these changes (we have made above) and update over android folder</Text>}
                text2={<Text>3. If you do this you'll be ensure that your android folder is working otherwise you'll see error while android gradle syncing</Text>}
                Banner={<BannerGetStarted />} BannerTop={5}
            />

        </ScrollView >
    </View >


    let renderScreen = {
        indicator: <ShowIndicator />,
        data: <Data />
    }


    return <>
        {renderScreen[delay]}
    </>
}

export default MainInstallation

