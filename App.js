import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {  useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthProvider from './src/screens/authScreens/authProvider';

import Authentication from './src/screens/authScreens/authentication';
import TwitterAuth from './src/screens/authScreens/twitterAuth';
import GoogleAuth from './src/screens/authScreens/googleAuth';
import FacebookAuth from './src/screens/authScreens/facebookAuth';
import EmailAuth from './src/screens/authScreens/emailAuth';
import ForgetPasswordScreen from './src/screens/authScreens/ForgetPasswordAuth';
import SignUpAuth from './src/screens/authScreens/SignUpAuth';
import PhoneAuth from './src/screens/authScreens/phoneAuth';
import Anonymous from './src/screens/authScreens/anonymous';

import UserScreen from './src/screens/UserScreen';

import Libraries from './src/screens/welcomeDrawerScreens/librarylist';

import AboutUs from './src/screens/welcomeDrawerScreens/aboutUs';

import MainInstallation from './src/screens/installation/mainInstallation';

import SecurityRules from './src/screens/securityRule/securityRules';

import TestLab from './src/screens/testLab/testLab';

import AppDistribution from './src/screens/appDIstribution/appDistribution';

import WelcomeDrawer from './src/navigations/welcomeDrawer';

import Credits from './src/screens/welcomeDrawerScreens/credits';

import InAppMessaging from './src/screens/messaging/inAppMessaging';
import CloudMessaging from './src/screens/messaging/cloudMessaging';

import DynamicLinks from './src/screens/dynamicLinks.js/dynamicLinks';

import Storage from './src/screens/storage/storage';
import UploadImage from './src/screens/storage/uploadImage';

import Firestore from './src/screens/firestore/firestore';
import Transaction from './src/screens/firestore/transaction';
import Query from './src/screens/firestore/query';
import ReadData from './src/screens/firestore/readData';
import WriteData from './src/screens/firestore/writeData';
import Other from './src/screens/firestore/other';

import KeyCertificate from './src/screens/guideScreen/keyCertificate';
import FirebaseConsole from './src/screens/guideScreen/firebaseConsole';
import OneSignal from 'react-native-onesignal';
import AdminPanel from './src/pushNotification/adminPanel/adminPanel';
import { oneSignalApiKey } from './src/apiKeys/keys';

const Stack = createNativeStackNavigator()

const App = () => {



  // OneSignal Initialization
  OneSignal.setAppId(oneSignalApiKey);

  useEffect(() => {

    let externalUserId = '123456789'; // You will supply the external user id to the OneSignal SDK
    OneSignal.setExternalUserId(externalUserId);

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {

      // console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);

      let notification = notificationReceivedEvent.getNotification();
      alert(notificationReceivedEvent.getNotification().additionalData.screenName)
      // console.log("notification: ", notification);

      const data = notification.additionalData
      // console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
      alert('clicked', notification.notification.additionalData.screenName);
    });


  }, [])




  const myLight = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#03a073',
      background: "#f3f4f6",
      // background: "#ffffff",
      card: "#ffffff",
      border: '#c7c7c7',
      mainText: '#1f1f1f',
      // mainText: '#1c1e21',
      subMainText: '#474747',
      smallBoxCenter: "#b2d7d7",
    }, roundness: 26,
  }

  const myDark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#03a073',
      background: '#151515',
      // background: '#18191a',
      card: "#000000",
      border: '#5e5e5e',
      mainText: '#c7c7c7',
      // mainText: '#f5f6f7',
      subMainText: '#8f8f8f',
      smallBoxCenter: '#4d4d4d',
    }
  }

  let theme = useColorScheme() === 'dark' ? myDark : myLight

  return (
    <NavigationContainer theme={theme} >
      <AuthProvider>
        <Stack.Navigator screenOptions={{ animation: 'fade_from_bottom', headerShown: false, }}  >

          <Stack.Screen name="welcomeDrawer" component={WelcomeDrawer} />

          {/* Get Started */}
          <Stack.Screen name="MainInstallation" component={MainInstallation} />
          {/* Get Started */}

          {/* Authentication welcome + in his screens */}
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="Google" component={GoogleAuth} />
          <Stack.Screen name="Facebook" component={FacebookAuth} />
          <Stack.Screen name="Email" component={EmailAuth} />
          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
          <Stack.Screen name="SignUp" component={SignUpAuth} />
          <Stack.Screen name="Twitter" component={TwitterAuth} />
          <Stack.Screen name="PhoneNumber" component={PhoneAuth} />
          <Stack.Screen name="Anonymous" component={Anonymous} />
          {/* Authentication welcome + in his screens */}

          {/* firestore */}
          <Stack.Screen name="Firestore" component={Firestore} />
          <Stack.Screen name="ReadData" component={ReadData} />
          <Stack.Screen name="WriteData" component={WriteData} />
          <Stack.Screen name="Query" component={Query} />
          <Stack.Screen name="Transaction" component={Transaction} />
          <Stack.Screen name="Other" component={Other} />
          {/* firestore */}

          {/* storage */}
          <Stack.Screen name='Storage' component={Storage} />
          <Stack.Screen name='UploadImage' component={UploadImage} />
          {/* storage */}

          {/* other screens in welcome */}
          <Stack.Screen name="Security Rules" component={SecurityRules} />
          <Stack.Screen name="TestLab" component={TestLab} />
          <Stack.Screen name="AppDistribution" component={AppDistribution} />
          <Stack.Screen name="InAppMessaging" component={InAppMessaging} />
          <Stack.Screen name="DynamicLinks" component={DynamicLinks} />
          <Stack.Screen name="CloudMessaging" component={CloudMessaging} />
          {/* other screens in welcome */}

          <Stack.Screen name='UserScreen' component={UserScreen} />

          {/* Welcome Drawer */}
          <Stack.Screen name='Libraries' component={Libraries} />
          <Stack.Screen name='Credits' component={Credits} />
          <Stack.Screen name='About Us' component={AboutUs} />
          {/* Welcome Drawer */}

          {/* guide Screens */}
          <Stack.Screen name='keyCertificate' component={KeyCertificate} />
          <Stack.Screen name='firebaseConsole' component={FirebaseConsole} />
          {/* guide Screens */}

          {/* Admin Panel */}
          <Stack.Screen name='AdminPanel' component={AdminPanel} />
          {/* Admin Panel */}

        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App
