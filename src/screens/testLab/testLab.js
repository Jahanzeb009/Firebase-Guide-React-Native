import { View, Text, ScrollView, StatusBar, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import SubBoxText from '../../components/boxText'
import { LinkInButton } from '../../components/link'
import { fontSize } from '../../components/fontSize'
import AnimatedHeaderWithImage from '../../components/animatedHeader'
import { SegmentedButtons } from 'react-native-paper'
import { BannerTestLab} from '../../admob/adUnitId'

const TestLab = () => {
    const { colors, dark } = useTheme()

    const Image = ({ image, h }) => {
        return (
            <View style={{ backgroundColor: colors.background, elevation: 2, marginHorizontal: 10, borderRadius: 16 }}>
                <FastImage
                    source={image}
                    style={{ height: h ? h : 190, borderRadius: 16 }}
                    resizeMode="contain" />
            </View>
        )
    }

    const title = (text, underline) => {
        return (
            <View style={{ backgroundColor: colors.card, paddingLeft: 10, marginBottom: 10, padding: 10, marginTop: 5 }}>
                <Text style={{ color: colors.mainText, fontWeight: 'bold', textDecorationLine: underline, fontSize: fontSize.mainTitle }}>{text}</Text>
            </View>
        )
    }

    const offset = useRef(new Animated.Value(0)).current;

    const [value, setValue] = useState('true');

    const [activeColor, setActiveColor] = useState(colors.primary)
    const [activeColor2, setActiveColor2] = useState(colors.card)

    let Simple = () => {
        return (
            <View>
                {title("Step 1")}
                <SubBoxText text={'Click on the Create Project Button'} link={<LinkInButton text={'Firebase Console'} link={'https://console.firebase.google.com/u/0/'} b tf mt={10} />} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/1.png')} />
                {title("Step 2")}
                <SubBoxText text={'Click on the Release & Monitor then Test Lab'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/2.png')} />
                {title("Step 3")}
                <SubBoxText text={'Click on the Browse button & Select your App, you can test both android & iOS app'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/3.png')} />
                {title("Step 4")}
                <SubBoxText text={'Click on reload button to check your app details'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/4.png')} />
                {title("Step 5")}
                <SubBoxText text={'Click on Device name to check your app details'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/5.png')} />
                <LinkInButton text={'Learn more'} link={'https://firebase.google.com/docs/test-lab/android/get-started?authuser=0'} m={10} b tf />
            </View>
        )
    }

    let Multiple = () => {
        return (
            <View>
                {title("Step 1")}
                <SubBoxText text={'Click on the Create Project Button'} link={<LinkInButton text={'Firebase Console'} link={'https://console.firebase.google.com/u/0/'} b tf mt={10} />} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/multiple/01.png')} h={191} />

                {title("Step 2")}
                <SubBoxText text={'Click on the Release & Monitor then Test Lab'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/multiple/02.png')} h={190} />

                {title("Step 3")}
                <Image image={require('../../../assets/test_lab/multiple/11.png')} h={183} />

                {title("Step 4")}
                <SubBoxText text={'Click on the Browse button & Select your App'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/multiple/22.png')} h={184} />

                {title("Step 5")}
                <SubBoxText text={'Click on Continue'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/multiple/33.png')} h={184} />

                {title("Step 6")}
                <SubBoxText text={'Click on Customize button & select device which in you want to test your app'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/multiple/44.png')} h={183} />

                {title("Step 7")}
                <SubBoxText text={'Selected devices names'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/multiple/55.png')} h={184} />

                {title("Step 8")}
                <SubBoxText text={'Click start & wait 5-10 min, you can change the testing time, default is 5min'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/multiple/66.png')} h={248} />

                {title("Step 9")}
                <SubBoxText text={'Click on incircle area to check your app details'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/test_lab/multiple/77.png')} h={184} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>

            <AnimatedHeaderWithImage animatedValue={offset} hh={180} ih={210} bg={'#0d7a6f'} source={require('../../../assets/header_images/test_lab.png')} />

            <ScrollView showsVerticalScrollIndicator={false} onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: offset } } }],
                { useNativeDriver: false }
            )} stickyHeaderIndices={[4]}>

                <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

                    <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />
                </View>

                <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

                <SubBoxText colorBG={colors.background} text={"Firebase Test Lab is a cloud-based app testing infrastructure that lets you test your app on a range of devices and configurations, so you can get a better idea of how it'll perform in the hands of live users."} link={<LinkInButton text={'Test Lab'} link={'https://firebase.google.com/docs/test-lab/?authuser=0#implementation_paths'} b tf mt={10} />} />
                <SubBoxText colorBG={colors.background} text={"We can't integrate firebase test lab in app, we have to use console to test apps"} />

                <View style={{ backgroundColor: colors.background, paddingTop: StatusBar.currentHeight }}>
                    <SegmentedButtons
                        value={value}
                        onValueChange={setValue}
                        style={{ margin: 10 }}
                        buttons={[
                            {
                                value: 'true',
                                label: <Text style={{ color: colors.mainText }}>Simple Test</Text>,
                                style: { flex: 1, backgroundColor: activeColor, borderColor: colors.border + 99 },
                                onPress: () => { setActiveColor(colors.primary), setActiveColor2('transparent') }
                            },
                            {
                                value: 'false',
                                label: <Text style={{ color: colors.mainText }}>Test with Multiple Opt</Text>,
                                style: { flex: 1, backgroundColor: activeColor2, borderColor: colors.border + 99 },
                                onPress: () => { setActiveColor2(colors.primary), setActiveColor('transparent') }
                            }
                        ]} />
                </View>
                

                {value == 'true' ? <Simple /> : <Multiple />}
                
            </ScrollView>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerTestLab/>
            </View>

        </View>
    )
}

export default TestLab