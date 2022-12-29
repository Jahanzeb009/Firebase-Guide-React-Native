import { View, Text, ScrollView, Dimensions, Animated, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../../components/fontSize'
import ShowIndicator from '../../components/ShowIndicator';
import { LinkInButton } from '../../components/link';
import { AnimatedHeaderWithText } from '../../components/animatedHeader';
import ImageModal from 'react-native-image-modal';
import { BannerGuideScreens } from '../../admob/adUnitId';

const SubFirebaseConsole = () => {

  const { colors, dark } = useTheme()

  const title = (text, underline) => {
    return (
      <View style={{ backgroundColor: colors.card, paddingLeft: 10, marginBottom: 10, padding: 10, paddingTop: StatusBar.currentHeight }}>
        <Text style={{ color: colors.mainText, fontWeight: 'bold', textDecorationLine: underline, fontSize: fontSize.mainTitle }}>{text}</Text>
      </View>
    )
  }

  const subText = (text) => {
    return (
      <Text style={{ fontSize: fontSize.subtitle, color: colors.mainText, marginBottom: 10, marginLeft: 10 }}>{text}</Text>
    )
  }

  const image = (image, h) => {
    return (
      <View style={{ backgroundColor: colors.background, elevation: 2 }}>
        <ImageModal
          imageBackgroundColor={colors.background}
          removeClippedSubviews={true}
          renderToHardwareTextureAndroid={true}
          source={image}fs
          style={{ width: Dimensions.get('screen').width, height: h ? h : 195, borderRadius: 16 }}
          resizeMode="contain" />
      </View>
    )
  }

  const offset = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent animated backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} showHideTransition />

      <AnimatedHeaderWithText animatedValue={offset} fc={'#ffffffc7'} bg={'#5566c5'} fs={40} hh={200} t={'Firebase\nConsole'} />

      <ScrollView showsVerticalScrollIndicator={false} onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: offset } } }],
        { useNativeDriver: false }
      )}
        stickyHeaderIndices={[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40]}
        style={{ flex: 1 }}
      >
        <View style={{ borderTopRightRadius: 28, borderTopLeftRadius: 28, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

          <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />
        </View >

        {title("Step 1")}
        <LinkInButton text={'Firebase Console'} link={'https://console.firebase.google.com'}  br={1} b tf />
        {image(require("../../../assets/firebaseConsole/1.png"))}

        {title("Step 2")}
        {subText("Enter your Project Name and Continue")}
        {image(require("../../../assets/firebaseConsole/2.png"))}

        {title("Step 3")}
        {subText("Project is creation is under process")}
        {image(require("../../../assets/firebaseConsole/3.png"))}

        {title("Step 4")}
        {subText("Click on the Android icon")}
        {image(require("../../../assets/firebaseConsole/4.png"))}

        {title("Step 5")}
        {subText("Enter your App Package Name & Register App")}
        {image(require("../../../assets/firebaseConsole/5.png"))}

        {title("Step 6")}
        {subText("Click Next. We will downlaod google-services.json file later in this guide")}
        {image(require("../../../assets/firebaseConsole/6.png"))}

        {title("Step 7")}
        {subText("Go to the project Setting by clicking the setting icon or your app package name")}
        {image(require("../../../assets/firebaseConsole/7.png"))}

        {title("Step 8")}
        {subText("Scroll down & select your package name & click on Add fingerprint")}
        {image(require("../../../assets/firebaseConsole/8.png"))}

        {title("Step 9")}
        {subText("After adding SHA-1 & SHA-256 certificates, downlaod google-services.json file & paste it in your ./android/app folder")}
        {image(require("../../../assets/firebaseConsole/9.png"), 180)}

        {title("Step 10")}
        {subText("Click on Authentication tab")}
        {image(require("../../../assets/firebaseConsole/10.png"), 180)}

        {title("Step 11")}
        {subText("Click on Get started")}
        {image(require("../../../assets/firebaseConsole/11.png"), 180)}

        {title("Step 12")}
        {subText("Choose any services you want in your app, now we will cover these services in this guide \n\nEmail/Password, Phone, Google, Facebook, Twitter")}
        {image(require("../../../assets/firebaseConsole/12.png"), 180)}

        {title("Step 13")}
        {subText("Enable service and click save")}
        {image(require("../../../assets/firebaseConsole/13.png"), 180)}

        {title("Step 14")}
        {subText("You can see our selected service is enabled")}
        {image(require("../../../assets/firebaseConsole/14.png"), 180)}

      </ScrollView >
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <BannerGuideScreens />
      </View>
    </View >
  )
}

const FirebaseConsole = () => {

  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 100);
  }, [])

  if (!delay) {
    return <ShowIndicator />
  } else {
    return <SubFirebaseConsole />
  }
}

export default FirebaseConsole