import { View, Text, Button, NativeModules, ScrollView, StyleSheet, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import ImageLoading from '../../components/imageLoading'
import { useTheme } from '@react-navigation/native'
import BN from '../../components/bottomNavigation'
import ShowIndicator from '../../components/ShowIndicator'
import { CodeSnippet } from '../../components/codeSnippet'
import { fontSize } from '../../components/fontSize'
import { LinkInButton } from '../../components/link'
import SubBoxText from '../../components/boxText'
import CustomButton, { CustomButton2 } from '../../components/customButton'
import { BannerAuthentication } from '../../admob/adUnitId'
import { AuthContext } from './authProvider'


const TwitterAuth = () => {

  const { checkUser, twitter } = useContext(AuthContext)

  useEffect(() => {
    checkUser('UserScreen')
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

        <CustomButton
          title={"Twitter Sign-In"}
          onPress={() => twitter()}
        />

      </View>

      <View style={{ alignItems: 'center' }}>
        <BannerAuthentication />
      </View>

    </View>
  )
}


const Guide = () => {

  const { colors } = useTheme()

  const imports = `// add these in 
// android/build.gradle
allprojects {
    repositories {
      ...
      maven { url 'https://jcenter.bintray.com' }
      maven { url 'https://mvnrepository.com/artifact/com.twitter.sdk.android/twitter-core' }
      maven { url 'https://mvnrepository.com/artifact/com.twitter.sdk.android/twitter-core?repo=springio-libs-release' }
      maven { url 'https://mvnrepository.com/repos/springio-libs-release' }
      ...
    }
}`

  const implemention = `// add these in
// android/app/build.gradle
android{
  dependencies {
    implementation 'com.twitter.sdk.android:twitter-core:3.3.0'
  }
}`

  const javaFiles = `// Go to this location and change these files
// node_modules\\react-native-twitter-signin\\android\\src\\main\\java\\com\\goldenowl\\twittersignin

// replace these with new files
1. TwitterSigninModule.java
2. TwitterSigninPackage.java
// add this file
3. TwitterSigninModules.java`

  const twitterConsole = `// Go to the Twitter Developer portal and add 
Callback-URL => twittersdk:// // --- for android
Callback-URL => twitterkit-YourAPI_KEY:// // --- for iOS

** Don't forget to enable Twitter authentication in Firebase Console and paste API_KEY & Your_Secret`


  const s = StyleSheet.create({
    textStyle: { fontSize: fontSize.mainTitle, paddingVertical: 10, backgroundColor: colors.card, padding: 10, color: colors.mainText, paddingTop: StatusBar.currentHeight },
    otheruse: { fontSize: fontSize.subtitle, padding: 10, paddingBottom: 0, color: colors.mainText }
  });

  const [delay, setDelay] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 300);

  }, [])

  if (!delay) {
    return <ShowIndicator />
  } else {
    return (
      <View style={{ flex: 1 }}>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}>
          <View><Text style={s.textStyle}>Initial Steps</Text></View>
          <CodeSnippet data={'npm install react-native-twitter-signin'} ViewHeight={50} copyCommand={'npm install react-native-twitter-signin'} />

          <SubBoxText text={'Are you facing this error or something like that \n\nCould not find "com.twitter.sdk.android:twitter-core:3.3.0"'}
            link0={<CustomButton2 title={'Click here'} onPress={() => { setVisible(!visible) }} />}
          />
          {visible &&
            <>
              <CodeSnippet data={imports} copyCommand={imports} />
              <CodeSnippet data={implemention} copyCommand={implemention} />
              <CodeSnippet data={javaFiles} copyCommand={javaFiles} />
              <LinkInButton text={'1. TwitterSigninModule.java'} b underline tf m={10} mt={1} link={'https://firebasestorage.googleapis.com/v0/b/rnfirebaseguide1.appspot.com/o/react-native-twitter-signin%2FTwitterSigninModule.java?alt=media&token=d07bc486-0356-4f63-9af7-af5556ee600a'} />
              <LinkInButton text={'2. TwitterSigninModules.java'} b underline tf m={10} mt={1} link={'https://firebasestorage.googleapis.com/v0/b/rnfirebaseguide1.appspot.com/o/react-native-twitter-signin%2FTwitterSigninModules.java?alt=media&token=845c62ab-f4a1-4e85-8592-ab174581e43b'} />
              <LinkInButton text={'3. TwitterSigninPackage.java'} b underline tf m={10} mt={1} link={'https://firebasestorage.googleapis.com/v0/b/rnfirebaseguide1.appspot.com/o/react-native-twitter-signin%2FTwitterSigninModules.java?alt=media&token=845c62ab-f4a1-4e85-8592-ab174581e43b'} />

              <CodeSnippet data={twitterConsole} copyCommand={twitterConsole} />
            </>
          }
          <SubBoxText text={'Rest of the configuration is same as it is define in the rnfirebase official webiste'} link={<LinkInButton text={'rnfirebase official'} b underline tf mt={10} link={'https://rnfirebase.io/auth/social-auth#twitter'} />} />
        </ScrollView>

        <View style={{ alignItems: 'center', }}>
          <BannerAuthentication />
        </View>

      </View>
    )
  }
}

const BottomNavigation = () => {
  return (
    <BN fc={TwitterAuth} sc={Guide} />

  )
}

export default BottomNavigation