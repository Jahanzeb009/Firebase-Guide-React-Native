import { View, Text, StyleSheet, ScrollView, Animated, StatusBar, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { CodeSnippet } from '../../components/codeSnippet'
import { fontSize } from '../../components/fontSize'
import { link, LinkInButton } from '../../components/link'
import { underline } from '../../components/underline'
import bold from '../../components/bold'
import ShowIndicator from '../../components/ShowIndicator'
import { AnimatedHeaderWithText } from '../../components/animatedHeader'
import { BannerGuideScreens } from '../../admob/adUnitId'

const SubKeyCertificate = () => {

  const { colors } = useTheme()

  const sha1 = `keytool -genkeypair -v -storetype PKCS12 -keystore <filename>.keystore -alias <enter-your-alias-name> -keyalg RSA -keysize 2048 -validity 10000`
  const sha12 = `keytool -genkey -v -keystore d:\<filename>.keystore -alias <enter-your-alias-name> -keyalg RSA -keysize 2048 -validity 10000`

  const gradle_properties = `"MYAPP_UPLOAD_STORE_FILE=<fileName>.keystore"
  "MYAPP_UPLOAD_KEY_ALIAS=your-key-alias"
  "MYAPP_UPLOAD_STORE_PASSWORD=Your_Password"
  "MYAPP_UPLOAD_KEY_PASSWORD=Your_Password"`

  const data = `// type
  'keytool -v -list -keystore <filename>.keystore'

  // don't worry while you type password it's not showing empty you just igonre them and type your password  
  'enter password:' 
  
  // you'll see your alias name SHA-1 & SHA-256 certificates etc.`

  const data1 = `// type
  keytool -genkeypair -v -storetype PKCS12 -keystore <filename>.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
  
  // it'll ask you some questions & craete password
  
  // after that type "YES"`

  const data2 = `"./android/gradle.properties" 
  or 
  "./android/app/build.gradle" 
  
  // under 
  
  "signingConfigs/debug object"`

  const data3 = `keytool -exportcert -alias your-key-alias -keystore "your .keystore file path example filepath D:\\folderName\\your-my.keystore" | "your-openssl-path-download-it-from-below-link example path D:\\openSsl\\bin\\openssl.exe" sha1 -binary | "your-openssl-path-download-it-from-below-link example path D:\\openSsl\\bin\\openssl.exe" base64`

  const s = StyleSheet.create({
    otheruse: {
      fontSize: fontSize.subtitle,
      paddingVertical: 10,
      padding: 10,
      marginBottom: 10,
      color: colors.mainText,
    },
    textStyle: {
      fontSize: fontSize.mainTitle,
      paddingVertical: 10,
      backgroundColor: colors.card,
      padding: 10,
      marginBottom: 10,
      color: colors.mainText,
      paddingTop: StatusBar.currentHeight
    },
  });

  const scrollTo = useRef()
  // let screenIndex;
  // const toNextPage = () => {
  //   screenIndex += 5;
  // };

  const offset = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <AnimatedHeaderWithText animatedValue={offset} fc={'#ffffffc7'} bg={'#55c5c0'} fs={40} hh={200} t={'Key\nCertificate'} />

      <ScrollView onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: offset } } }],
        { useNativeDriver: false }
      )} ref={scrollTo} stickyHeaderIndices={[1, 11, 14, 17, 19, 22]} showsVerticalScrollIndicator={false}>

        <View style={{ borderTopRightRadius: 28, borderTopLeftRadius: 28, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }} >

          <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />
        </View>

        <View><Text style={s.textStyle}>Generate SHA-1 & SHA-256 certificates</Text></View>
        <View><Text style={s.otheruse}>For Firebase or any other</Text></View>
        <View><Text style={s.otheruse}>open CMD from run as administrator and go to the {underline("java/bin")} folder where you install</Text></View>
        <View><Text style={s.otheruse}>This command will craete .keystore file in that folder</Text></View>
        <CodeSnippet data={sha1} ViewHeight={70} button copyCommand={'keytool -genkeypair -v -storetype PKCS12 -keystore <filename>.keystore -alias <enter-your-alias-name> -keyalg RSA -keysize 2048 -validity 10000'} />
        <View style={{ alignItems: 'center' }}><Text style={[s.otheruse]}>OR</Text></View>
        <View><Text style={s.otheruse}>This command will craete .keystore file in your selected folder{"\n"}{"\n"}use this when you not run{underline("CMD from run as administrator")}</Text></View>
        <CodeSnippet data={sha12} ViewHeight={70} button copyCommand={'keytool -genkey -v -keystore d:\<filename>.keystore -alias <enter-your-alias-name> -keyalg RSA -keysize 2048 -validity 10000'} />
        <Text style={s.otheruse}>after successfully generated file, copy this file and paste it in ./android/app/ and make some changes in {underline("./android/gradle.properties")}</Text>
        <CodeSnippet data={gradle_properties} ViewHeight={135} button copyCommand={
          `MYAPP_UPLOAD_STORE_FILE=<fileName>.keystore
        MYAPP_UPLOAD_KEY_ALIAS=your-key-alias
        MYAPP_UPLOAD_STORE_PASSWORD=Your_Password
        MYAPP_UPLOAD_KEY_PASSWORD=Your_Password`}
        />

        <View><Text style={s.textStyle}>Open existing Keytool file</Text></View>
        <Text style={s.otheruse}>Default location {underline("./android/app/debug.keystore")} {"\n"}{"\n"}
          1. Check keytool file OR look inside file?{"\n"}{"\n"}
          2. Go to where you install java SDK in your PC{"\n"}{"\n"}
          3. In my case my location is {underline("C:/Program Files/Java/jdk-18.0.2.1/bin")}{"\n"}{"\n"}
          4. in this folder {"=>"} {bold("Open CMD termial from run as administrator")} otherwise you face access denied error{"\n"}{"\n"}
          5. Then click on "open powershell window here"  type{"\n"}{"\n"}
          6. also paste keytool file inside /bin folder</Text>
        <CodeSnippet data={data} ViewHeight={210} button copyCommand={'keytool -v -list -keystore filename.keystore'} />

        <View><Text style={s.textStyle}>Create keystore file</Text></View>
        <Text style={s.otheruse}>1. Go to where you install java SDK in your PC{"\n"}{"\n"}
          2. In my case my location is {underline("C:/Program Files/Java/jdk-18.0.2.1/bin")}{"\n"}{"\n"}
          3. in this folder {"=>"} {underline("Open CMD termial from run as administrator \notherwise you face access denied error")}
        </Text>
        <CodeSnippet data={data1} ViewHeight={180} button copyCommand={"keytool -genkeypair -v -storetype PKCS12 -keystore <filename>.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000"} />

        <View><Text style={s.textStyle}>See existing keystore Password in android folder</Text></View>
        <CodeSnippet data={data2} ViewHeight={210} button />

        <View><Text style={s.textStyle}>For facebook hash key</Text></View>
        <Text style={s.otheruse}>Go to your installed java/bin folder {underline("open CMD termial from run as administrator")}</Text>
        <CodeSnippet data={data3} ViewHeight={70} button copyCommand={data3} />

        <Text style={s.otheruse}>Download openSSL link given below</Text>
        <LinkInButton text={'OpenSSL for windows'} link={'https://code.google.com/archive/p/openssl-for-windows/downloads'}  mr={10} ml={10} b tf />
        <Text style={s.otheruse}>you can also read Official react native website for more information</Text>
        <LinkInButton text={'Official React Native Docs'} link={'https://reactnative.dev/docs/signed-apk-android.html'}  mr={10} ml={10} b tf />
        <Text style={s.otheruse}></Text>
      </ScrollView>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <BannerGuideScreens />
      </View>

    </View>
  )
}


const KeyCertificate = () => {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 100);

  }, [])

  if (!delay) {
    return <ShowIndicator />
  } else {
    return <SubKeyCertificate />
  }
}



export default KeyCertificate