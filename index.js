/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Background & Quit state messages

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('background message received')
})

AppRegistry.registerComponent(appName, () => App);
