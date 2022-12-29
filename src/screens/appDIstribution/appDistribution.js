import { View, Text, ScrollView, Dimensions, StatusBar, Animated } from 'react-native'
import React, { useRef } from 'react'
import { useTheme } from '@react-navigation/native'
import ImageModal from 'react-native-image-modal'
import { fontSize } from '../../components/fontSize'
import SubBoxText from '../../components/boxText'
import AnimatedHeaderWithImage from '../../components/animatedHeader'
import {  BannerAppDistribution } from '../../admob/adUnitId'

const AppDistribution = () => {

    const { colors, dark } = useTheme()

    const title = (text, underline) => {
        return (
            <View style={{ backgroundColor: colors.card, paddingLeft: 10, padding: 10, paddingTop: StatusBar.currentHeight }}>
                <Text style={{ color: colors.mainText, fontWeight: 'bold', textDecorationLine: underline, fontSize: fontSize.mainTitle }}>{text}</Text>
            </View>
        )
    }

    const Image = ({ image, h }) => {
        return (
            <View style={{ backgroundColor: colors.background, elevation: 2, borderRadius: 16, marginVertical: 10 }}>
                <ImageModal
                    imageBackgroundColor={colors.background}
                    removeClippedSubviews={true}
                    renderToHardwareTextureAndroid={true}
                    source={image}
                    style={{ width: Dimensions.get('screen').width, height: h ? h : 200, borderRadius: 16 }}
                    resizeMode="contain" />
            </View>
        )
    }

    const offset = useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

            <AnimatedHeaderWithImage animatedValue={offset} hh={175} ih={210} bg={'#006eba'} source={require('../../../assets/header_images/app_distribution.png')} />

            <ScrollView showsVerticalScrollIndicator={false} onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: offset } } }],
                { useNativeDriver: false }
            )} stickyHeaderIndices={[2, 5, 8, 10, 12, 14, 16, 18, 21, 23, 25, 28, 31, 33]}>

                <View style={{ borderTopRightRadius: 28, borderTopLeftRadius: 28, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

                    <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />
                </View >

                <SubBoxText colorBG={colors.background} mV={10} text={"Firebase App Distribution gives a holistic view of your beta testing program across iOS and Android, providing you with valuable feedback before a new release is in production. You can send pre-release versions of your app using the console or your CI servers, and installing your app is easy for testers."} />

                {title('Step 1')}
                <SubBoxText text={'Click on browse to select your app'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/app_distribution/1.png')} h={193} />

                {title('Step 2')}
                <SubBoxText text={"Select tester group, if you have not group, we'll create group later in this guide"} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/app_distribution/2.png')} />

                {title('Step 3')}
                <Image image={require('../../../assets/app_distribution/3.png')} />

                {title('Step 4')}
                <Image image={require('../../../assets/app_distribution/4.png')} />

                {title('Step 5')}
                <Image image={require('../../../assets/app_distribution/5.png')} />

                {title('Step 6')}
                <Image image={require('../../../assets/app_distribution/6.png')} />

                {title('Step 7')}
                <Image image={require('../../../assets/app_distribution/7.png')} />

                {title('Step 8')}
                <SubBoxText text={"Open Excel file enter HEADER Name: 'email', and put all yours email below email header and save as .csv file"} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/app_distribution/8.png')} />

                {title('Step 9')}
                <Image image={require('../../../assets/app_distribution/9.png')} />

                {title('Step 10')}
                <Image image={require('../../../assets/app_distribution/10.png')} />

                {title('Step 11')}
                <SubBoxText text={'Select Tester, which you want to share your release file'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/app_distribution/11.png')} />

                {title('Step 12')}
                <SubBoxText text={'You can allow only specific domain like your company domain is example.com other than that no one can access your invite link, even that they have the invite link'} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/app_distribution/12.png')} />

                {title('Step 13')}
                <Image image={require('../../../assets/app_distribution/13.png')} />

                {title('Step 14')}
                <SubBoxText text={"Invite link send to tester's mail automatically, you can send them manualy"} colorBG={"transparent"} color={'transparent'} />
                <Image image={require('../../../assets/app_distribution/14.png')} h={377} />

            </ScrollView>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerAppDistribution />
            </View>

        </View>
    )
}

export default AppDistribution