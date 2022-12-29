import { View, Text, Image, ScrollView, Linking, Dimensions, StatusBar, Vibration, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { AuthContext } from './authProvider';
import { BottomNavigation } from 'react-native-paper';
import { fontSize } from '../../components/fontSize';
import CustomButton from '../../components/customButton';
import { CodeSnippet } from '../../components/codeSnippet';
import { underline } from '../../components/underline';
import { LinkInButton } from '../../components/link';
import ShowIndicator from '../../components/ShowIndicator';
import { BannerAuthentication } from '../../admob/adUnitId';

const MyComponent = () => {

  const { colors } = useTheme()
  const { facebookLogin, checkUser } = useContext(AuthContext)

  useEffect(() => {
    checkUser('UserScreen')
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <CustomButton
          title={"Facebook Sign-In"}
          onPress={() => facebookLogin()}
        />

      </View>

      <View style={{ alignItems: 'center' }}>
        <BannerAuthentication />
      </View>
    </View >
  )
}

const SubFacebookGuide = ({ navigation }) => {

  const { colors } = useTheme()

  const title = (text, underline) => {
    return (
      <View style={{ backgroundColor: colors.card, paddingLeft: 10, marginVertical: 20, padding: 10, paddingTop: StatusBar.currentHeight }}>
        <Text style={{ color: colors.mainText, fontWeight: 'bold', textDecorationLine: underline, fontSize: 30, }}>{text}</Text>
      </View>
    )
  }

  const subText = (text, underline, bold, linkText, link, navigate) => {
    return (
      <View style={{ marginTop: 6 }}>
        {text ?
          <Text
            style={{
              marginBottom: 10,
              color: colors.mainText,
              fontWeight: bold ? 'bold' : null,
              marginHorizontal: 10,
              fontSize: fontSize.subtitle,
              textDecorationLine: underline ? 'underline' : null,
            }}
            onPress={() => { if (link) { Linking.openURL(link) } }}>{text}</Text> : null}
        {link ? <Text
          style={{
            marginBottom: 10,
            color: 'steelblue',
            fontWeight: 'bold',
            marginHorizontal: 10,
            fontSize: fontSize.subtitle,
            textDecorationLine: 'underline',
          }}
          onPress={() => { Linking.openURL(link) }}>{linkText}</Text> :
          navigate ? <Text
            style={{
              marginBottom: 10,
              color: 'steelblue',
              fontWeight: 'bold',
              marginHorizontal: 10,
              fontSize: fontSize.subtitle,
              textDecorationLine: 'underline',
            }}
            onPress={() => { navigation.navigate(navigate) }}>{linkText}</Text> : null}
      </View>
    )

  }

  const image = (image) => {
    return (
      <View style={{ backgroundColor: colors.background, elevation: 2 }}>
        <Image
          source={image}
          style={{ width: Dimensions.get('screen').width, height: 200, resizeMode: 'contain' }}
          resizeMode="contain" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>

      <ScrollView stickyHeaderIndices={[0, 4, 8, 11, 14, 17, 20, 23, 25, 30, 35, 44, 47, 51]} style={{ backgroundColor: colors.background }}>

        {title('Step 1')}
        {subText('Install this dependency')}
        <CodeSnippet data={'npm i react-native-fbsdk-next'} ViewHeight={60} copyCommand={'npm i react-native-fbsdk-next'} button />
        <LinkInButton text={'react-native-fbsdk-next'} link={"https://github.com/thebergamo/react-native-fbsdk-next"} mr={10} ml={10} b tf />

        {title('Step 2')}
        {subText('Click on this link', "", "", "Configured your Android application", "https://developers.facebook.com/docs/android/getting-started/")}
        {subText("Press the Quick Start for Android", '')}
        {image(require("../../../assets/facebookGuide/1.png"))}

        {title('Step 3')}
        {subText("Select your Application Type & click next", '')}
        {image(require("../../../assets/facebookGuide/2.png"))}

        {title('Step 4')}
        {subText("Enter your Application name & email address, then \nPress Create App")}
        {image(require("../../../assets/facebookGuide/3.png"))}

        {title('Step 5')}
        {subText("Click on the Add Product & select Facebook Login set up")}
        {image(require("../../../assets/facebookGuide/4.png"))}

        {title('Step 6')}
        {subText("Click on Android Button")}
        {image(require("../../../assets/facebookGuide/5.png"))}

        {title('Step 7')}
        {subText("Click on Next, don't need to download Facebook SDK")}
        {image(require("../../../assets/facebookGuide/6.png"))}

        {title('Step 8')}
        {subText("Follow step 2 (website), it's clearly describe")}

        {title('Step 9')}
        {subText("In step 3 (website), enter your")}
        {subText("Package Name & Default Activity Class Name", 'underline', 'bold')}
        {subText("For example: \nPackage Name : com.firebase\nActivity Name : com.firebase.MainActivity", '', 'bold')}
        {image(require("../../../assets/facebookGuide/7.png"))}

        {title('Step 10')}
        {subText("In step 4 (website)")}
        {subText("Generating a Development Key Hash", 'underline', 'bold')}
        {subText("Follow these guides, if you face any issue you can checkout this page",)}
        {subText("", '', '', "Learn more", '', 'keyCertificate')}

        {title('Step 11')}
        {subText("APP ID , Client Token , Secret Code", '', 'bold')}
        {subText("Go to main dashboard and click Setting/Basic")}
        {subText("You will get App ID & App Secret", 'underline', 'bold')}
        {image(require("../../../assets/facebookGuide/8.png"))}
        {subText("Client Token:", "", "bold")}
        {subText("Go to main dashboard and click Setting/Advanced & scroll down little bit")}
        {image(require("../../../assets/facebookGuide/9.png"))}
        {subText("Enter these credentials in your Manifest file")}

        {title('Step 12')}
        {subText("Follow website guides till")}
        {subText("Step 6. Edit Your Resources and Manifest", 'underline', 'bold')}

        {title('Step 13')}
        {subText("You have to provide your")}
        {subText("Privacy Policy URL", 'underline', 'bold')}
        {image(require("../../../assets/facebookGuide/10.png"))}

        {title('Step 14')}
        {subText("After doing all above steps click on this")}
        {subText("Button and live your application", 'underline', 'bold')}
        {image(require("../../../assets/facebookGuide/11.png"))}

      </ScrollView>
      <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
        <BannerAuthentication />
      </View>
    </View>

  )
}

const FacebookGuide = () => {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 300);

  }, [])

  if (!delay) {
    return <ShowIndicator />
  } else {
    return <SubFacebookGuide />
  }
}

const SubGuideInApp = () => {

  const { colors } = useTheme()

  const auth = `import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

  facebookLogin : async () => {
  try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        "email", "public_profile", "user_friends"
      ]);

      if (result.isCancelled) {
          throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
          throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(facebookCredential);

  } catch (error) {
      console.log("onFacebookButtonPress", error.message);
  }
}`

  const styles = StyleSheet.create({
    text: {
      fontSize: fontSize.mainTitle,
      paddingVertical: 10,
      backgroundColor: colors.card,
      padding: 10,
      marginBottom: 10,
      color: colors.mainText,
      paddingTop: StatusBar.currentHeight
    }
  })

  return (
    <View style={{ flex: 1, paddingBottom: 10 }}>
      <ScrollView stickyHeaderIndices={[0, 3]} showsVerticalScrollIndicator={false}>

        <View>
          <Text style={styles.text}>Use this code Snippet to trigger fb signin</Text>
        </View>
        <Image source={require('../../../assets/facebookGuide/separate.jpg')} style={{ resizeMode: 'contain', width: '100%', height: 400, borderRadius: 16 }} resizeMode="contain" />
        <CodeSnippet data={auth} copyCommand={auth} />

        <View>
          <Text style={styles.text}>If Error</Text>
        </View>

        <Text style={styles.text}>1</Text>
        <Image source={require('../../../assets/facebookGuide/error.jpg')} style={{ resizeMode: 'contain', width: '100%', height: 140, borderRadius: 16 }} resizeMode="contain" />
        <Text style={[styles.text, { fontSize: fontSize.subtitle }]}>You have to enable to {underline("Advanced Access")} some permissions in facebook developer console {underline("Email & public_profile")}</Text>
        {underline("Goto facebook developer console/App Review/Permissions and Features/ ")}
        <Image source={require('../../../assets/facebookGuide/enable_permission.png')} style={{ resizeMode: 'contain', width: '100%', height: 200, borderRadius: 16, marginTop: 10 }} resizeMode="contain" />
        <LinkInButton text={'Facebook Developer Console'} link={'https://developers.facebook.com/?no_redirect=1'} br={1} />

        <Text style={styles.text}>2</Text>
        <Text style={[styles.text, { fontSize: fontSize.subtitle, fontWeight:'100' , paddingTop:5}]}>error {'\n'}invalid key hash the key hash does not match any stored key hashes fbsdk react native</Text>
        <Text style={[styles.text, { fontSize: fontSize.subtitle, fontWeight:'100' , paddingTop:5}]}>Solution : {'\n'}You have to double check the key hash value we create in previous steps, check openssl and .keystore file path properply, and {'\n'}If you have 64bit pc/window download openssl-0.9.8e_X64.zip file</Text>

      </ScrollView>

      <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
        <BannerAuthentication />
      </View>

    </View>
  )
}

const GuideInApp = () => {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 300);

  }, [])

  if (!delay) {
    return <ShowIndicator />
  } else {
    return <SubGuideInApp />
  }
}

const FacebookAuth = () => {

  const { colors, dark } = useTheme()
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Auth', title: 'Test', focusedIcon: 'home-variant', unfocusedIcon: 'home-variant-outline' },
    { key: 'GuideWeb', focusedIcon: 'information', unfocusedIcon: 'information-outline' },
    { key: 'GuideApp', title: 'Guide in App', focusedIcon: 'android', },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Auth: MyComponent,
    GuideWeb: FacebookGuide,
    GuideApp: GuideInApp
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />
      <BottomNavigation
        shifting
        // compact
        onTabPress={() => { Vibration.vibrate([1, 5, 10, 5, 1]) }}
        activeColor={colors.primary}
        inactiveColor={colors.mainText}
        theme={{
          colors: {
            background: colors.background, // bottom navigation me jab shifting hoti ha to back py ye show hota ha
            secondaryContainer: colors.primary + 30, // bottom navigation me icons ky backgroundColor change krny ka lia
            onSurface: colors.mainText, // bottom navigation me icons ky nechy text / label ky color ko change krny ka lia
            onSurfaceVariant: colors.mainText, // bottom navigation me icons ky nechy text changing to doran show hota ha color
          }
        }}
        // sceneAnimationEnabled={true}
        barStyle={{ backgroundColor: colors.card, height: 70 }}
        // sceneAnimationType='shifting'
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
  );
}

export default FacebookAuth



// primary: "red",
// accent: "blue",
// text: 'yellow',
// backdrop: 'blue',
// elevation: 3,
// inversePrimary: 'steelblue',
// onBackground: 'orange',
// onPrimary: 'blue',
// outline: "blue",
// placeholder: 'yellow',
// secondary: 'blue',
// tertiary: "blue",
// onTertiary: "blue",
// primaryContainer: 'orange',

// tertiaryContainer: 'white',
// onPrimaryContainer: 'yellow',
// onSecondaryContainer: 'blue',
// onTertiaryContainer: 'blue',
// notification: 'blue',

// onSecondary: 'blue',
// surface: 'blue',
// surfaceVariant: 'blue',
// error: 'blue',
// inverseOnSurface: 'blue',
// inverseSurface: 'blue',
// onSurfaceDisabled: 'blue',
// surfaceDisabled: 'blue',
// disabled: 'blue',
// errorContainer: 'blue',
// onError: 'blue',
// onErrorContainer: 'blue',