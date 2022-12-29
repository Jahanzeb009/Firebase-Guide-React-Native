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
import CollapsableCard from '../../components/collapsableCard'
import { BannerDynamicLinks } from '../../admob/adUnitId'

const DynamicLinks = () => {

  const { colors, dark } = useTheme()


  let data1 = `npm i @react-native-firebase/dynamic-links`
  let data2 = `yarn add @react-native-firebase/dynamic-links`

  let listenLink = `<activity
  android:name=".MainActivity"
  ...
  >
  <intent-filter android:autoVerify="true">
      <action android:name="android.intent.action.VIEW"/>
      <category android:name= "android.intent.category.DEFAULT" />
      <category android:name= "android.intent.category.BROWSABLE" />
      <data android:scheme= "https" android:host="yourLink.page.link" />
  </intent-filter>
  ...
</activity>`

  let ManageLink = `useEffect(() => {

    const handleDynamicLink = link => {

      // this link.url is deeplink which you put while creating dynamicLink in console
      if (link?.url === 'https://your_dynamic_link/openOfferScreen') {
        navigation.navigate("OfferScreen")
      } else if (link?url === 'https://your_dynamic_link/openSummerSaleScreen')
      navigation.navigate("Sale")
    } else {
      ToastAndroid('Not Valid Link')
    };

    // for Foreground App link listen
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    // for Background/Quit app link lister
    const unsubscribe2 = dynamicLinks().getInitialLink().then(link => {
      // this link.url is deeplink which you put while creating dynamicLink in console
      if (link?.url === 'https://your_dynamic_link/openOfferScreen') {
        navigation.navigate("OfferScreen")
      } else if (link?url === 'https://your_dynamic_link/openSummerSaleScreen')
      navigation.navigate("Sale")
    } else {
      ToastAndroid('Not Valid Link')
    }
    });
    
    // When the component is unmounted, remove the listener
    return () => {
      unsubscribe // for Foreground App link listen
      unsubscribe2 // for Background/Quit app link lister
    }

}, [])`


  const offset = useRef(new Animated.Value(0)).current;

  const image = (image, h) => {
    return (
      <View style={{ elevation: 2, marginTop: 10 }}>
        <ImageModal
          imageBackgroundColor={'transparent'}
          removeClippedSubviews={true}
          renderToHardwareTextureAndroid={true}
          source={image}
          style={{ width: Dimensions.get('screen').width - 40, height: h ? h : 195, }}
          resizeMode="contain" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

      <AnimatedHeaderWithImage animatedValue={offset} hh={175} ih={210} bg={'#fb1965'} source={require('../../../assets/header_images/dynamic_links.png')} />

      <ScrollView showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )} >
        <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

          <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />

        </View>

        <SubBoxText color={'#ff53532f'} colorBG={colors.background} text={<Text>This module requires that the {underline("@react-native-firebase/app")} module is already setup and installed.</Text>} link={<LinkInButton b text={'@react-native-firebase/app'} navigation={'MainInstallation'} mt={5} />} />

        <LinkInButton b text={'Firebase Console'} link={'https://console.firebase.google.com/u/0/'} mt={5} mr={10} ml={10} mb={5} />
        <LinkInButton b text={'Dynamic Link Setup'} link={'https://rnfirebase.io/dynamic-links/usage#firebase-setup'} mt={5} mr={10} ml={10} mb={5} />
        <LinkInButton b text={'Open Dynamic Link'} link={'https://rnfirebaseguide.page.link/Libraries'} mt={5} mr={10} ml={10} mb={5} />

        <CodeSnippet data={data1} ViewHeight={60} copyCommand={data1} />
        <CodeSnippet data={data2} ViewHeight={60} copyCommand={data2} mv={1} />

        <CollapsableCard title={'Listen link in app'} data={<CodeSnippet data={ManageLink} ViewHeight={850} copyCommand={ManageLink} />} />

        <SubBoxText title={'Check Dynamic Link'} text={<Text>I created a link in which when someone click then {underline("directly open app and go to Libraries screen")}{"\n"}{"\n"}Click on this below link to check</Text>}
          link0={<LinkInButton b text={'Open Dynamic Link'} link={'https://rnfirebaseguide.page.link/Libraries'} mt={5} mb={5} />}
          code={<CodeSnippet data={'https://rnfirebaseguide.page.link/Libraries'} ViewHeight={60} copyCommand={'https://rnfirebaseguide.page.link/Libraries'} mh={1} />}
        />
        <SubBoxText text={<Text>Only {underline("Google Provided Domain")} are free if you have not your own domain. {'\n'}{'\n'}Dynamic link must ends with {underline('.page.link')}, it's free otherwise you have to own this domain by purchasing and verify that domain from admin panel</Text>}
          image0={image(require('../../../assets/dynamic_links/1.png'), 174)}
        />

        <SubBoxText title={'Check your dynamic link'} code={<CodeSnippet data={'https://YOUR_DOMAIN/.well-known/assetlinks.json'} ViewHeight={60} copyCommand={'https://YOUR_DOMAIN/.well-known/assetlinks.json'} mv={5} mh={1} />}
          link0={<LinkInButton b tf text={'read more official doc'} link={'https://firebase.google.com/docs/dynamic-links/android/receive#app_links'} mt={10} />}
        />

        <CollapsableCard title={'Show app in link open tab'} data={<SubBoxText
          mH={1} mV={1} text={<Text>If you want to listen your dynamic links or other links in your app you have to add an {underline("activity")} in your manifiest file</Text>}
          image0={image(require('../../../assets/dynamic_links/2.png'), 130)}
          link0={<LinkInButton b tf text={'read more official doc'} link={'https://firebase.google.com/docs/dynamic-links/android/receive#add-an-intent-filter-for-deep-links'} mt={5} />}
          code={<CodeSnippet data={listenLink} ViewHeight={300} copyCommand={listenLink} mh={-1} mv={10} />}
        />}
        />

        <Title text={'What does it do'} />
        <YoutubePlayerCustom id={'LvY1JMcrPF8'} />

      </ScrollView>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <BannerDynamicLinks />
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
    return <DynamicLinks />
  }
}

export default Indicator