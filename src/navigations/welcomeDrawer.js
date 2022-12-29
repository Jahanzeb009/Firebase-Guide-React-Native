import { View, StatusBar, LayoutAnimation, Platform, UIManager, Text, Image, Linking, Share, Vibration } from 'react-native'
import React, { useState } from 'react'

import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, IconButton, TouchableRipple } from 'react-native-paper';
import { useNavigation, useTheme } from '@react-navigation/native';




import Ionicons from 'react-native-vector-icons/Ionicons'
import Materiallcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Welcome from '../screens/welcome';
import { fontSize } from '../components/fontSize';


function CustomDrawerContent({ navigation, progress, ...rest }) {


    // const progress = useDrawerProgress();

    // const translateX =Animated.interpolate(progress, {
    //     inputRange: [0, 1],
    //     outputRange: [-100, 0],
    // });

    const { navigate } = useNavigation()

    const { colors, dark } = useTheme()

    const [auth, setAuth] = useState(false)
    const [firestore, setFirestore] = useState(false)
    const [facebook, setFacebook] = useState(false)
    const [mainActive, setMainActive] = useState('')
    const [subActive, setSubActive] = useState('')
    const [rotateAuth, setRotateAuth] = useState(true)
    const [rotateFire, setRotateFire] = useState(true)

    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    // const toggleOpen = () => {
    //     LayoutAnimation.easeInEaseOut();
    // }

    // let drawerSection = (label, useState, otherUse, icontype, icon, size, color, right) => {
    //     return (
    //         <Drawer.Item
    //             label={label}
    //             icon={() => icontype === 'oct' ? <Octicons name={icon} size={size} color={color} />
    //                 : icontype === 'mat' ? <Materiallcons name={icon} size={size} color={color} />
    //                     : icontype === 'ion' ? <Ionicons name={icon} size={size} color={color} />
    //                         : icontype === 'matcom' ? <MaterialCommunityIcons name={icon} size={size} color={color} />
    //                             : icontype === 'font5' ? <FontAwesome5 name={icon} size={size} color={color} />
    //                                 : icontype === 'font' ? <FontAwesome name={icon} size={size} color={color} />
    //                                     : icontype === 'icon' ? <IconButton icon={icon} size={size} iconColor={color} />
    //                                         : icontype === 'custom' ? <Image source={icon} style={{ width: size, height: size, tintColor: color, resizeMode: 'contain' }} />
    //                                             : null}
    //             theme={{
    //                 colors: {
    //                     onSecondaryContainer: color, // Drawer me active tab ka text ko change krny ka lia
    //                     onSurfaceVariant: colors.mainText, // Drawer me Label color ko change krny ka lia
    //                     secondaryContainer: color + 20, // Drawer me active tab background color 

    //                     text: colors.primary,
    //                     primary: color,
    //                     accent: "blue",
    //                     text: 'yellow',
    //                     backdrop: 'blue',
    //                     elevation: 3,
    //                     inversePrimary: 'steelblue',
    //                     onBackground: 'orange',
    //                     onPrimary: 'blue',
    //                     outline: "blue",
    //                     placeholder: 'yellow',
    //                     secondary: 'blue',
    //                     tertiary: "blue",
    //                     onTertiary: "blue",
    //                     primaryContainer: 'orange',

    //                     tertiaryContainer: 'white',
    //                     onPrimaryContainer: 'yellow',
    //                     onTertiaryContainer: 'blue',
    //                     notification: 'blue',

    //                     onSecondary: 'blue',
    //                     surface: 'blue',
    //                     surfaceVariant: 'blue',
    //                     error: 'blue',
    //                     inverseOnSurface: 'blue',
    //                     inverseSurface: 'blue',
    //                     background: 'blue',
    //                     onSurface: 'blue',
    //                 }, roundness: 100
    //             }}
    //             style={{ padding: 10, }}
    //             active={mainActive === otherUse}

    //             right={() =>
    //                 right === 'Auth' ? <Materiallcons name={'play-arrow'} size={17} color={color} style={{ transform: [{ rotate: rotateAuth ? '0deg' : '90deg', }] }} onPress={() => { toggleOpen() }} />
    //                     : right === 'Fire' ? <Materiallcons name={'play-arrow'} size={17} color={color} style={{ transform: [{ rotate: rotateFire ? '0deg' : '90deg' }] }} onPress={() => { toggleOpen() }} />
    //                         : null
    //             }
    //             onPress={() => {
    //                 setMainActive(otherUse)
    //                 toggleOpen()
    //                 if (useState === "Auth") {
    //                     setAuth(!auth)
    //                     setFirestore(false)
    //                     setRotateFire(true)
    //                     setRotateAuth(!rotateAuth)
    //                 } else if (useState === 'Fire') {
    //                     setFirestore(!firestore)
    //                     setAuth(false)
    //                     setRotateAuth(true)
    //                     setRotateFire(!rotateFire)
    //                 } else if (useState === 'Facebook') {
    //                     setFacebook(!facebook)
    //                 }
    //                 if (useState !== 'Auth' && useState !== 'Fire' && useState !== 'Facebook') {
    //                     navigate(otherUse)
    //                 }
    //             }}
    //         />
    //     )
    // }


    let drawerSectionSub = (label, link, navigattion, share, icon, size, color) => {
        return (
            <TouchableRipple >
                <Drawer.Item
                    label={label}
                    icon={() => < IconButton icon={icon} size={size} iconColor={color} />}
                    theme={{
                        colors: {
                            onSecondaryContainer: color,
                            onSurfaceVariant: colors.mainText,
                            secondaryContainer: color + 20,
                        }, roundness: 100
                    }}
                    style={{ marginTop: 10 }}
                    active={subActive === label}
                    onPress={() => {
                        setSubActive(label)
                        Vibration.vibrate(40)
                        if (link) {
                            Linking.openURL(link)
                        } else if (navigattion) {
                            navigate(navigattion)
                        } else if (share) {
                            Share.share({ message: 'Download Firebase Guide - React Native with complete guide step by step & source code with live demonstration of firebase modules.\nGet it from given link below\nhttps://play.google.com/store/apps/details?id=com.jahanzeb.dev.firebase.guide' })
                        }
                    }}
                />
            </TouchableRipple>
        )
    }



    return (

        <DrawerContentScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

            <StatusBar animated backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

            {drawerSectionSub('Libraries', '', 'Libraries', '', 'library', 25, '#ef5d58')}
            {/* {drawerSectionSub('Support Me', '', 'Support Me', '', 'gesture-tap', 25, '#325453')} */}
            {drawerSectionSub('Credits', '', 'Credits', '', 'handshake', 25, '#5e253c')}
            {/* {drawerSectionSub('Setting', '', 'Libraries', 'cog', 25, '#b9bbbd')} */}
            {/* {drawerSectionSub('About Us', '', 'About Us', '', 'information-outline', 25, '#45C4B0')} */}
            {drawerSectionSub('Source Code', 'https://github.com/Jahanzeb009/react-native-firebase-guide', '', '', 'github', 25, '#1479df')}
            {drawerSectionSub('Share', '', '', 'share', 'share-variant', 25, '#13678A')}
            {drawerSectionSub('Rate us', 'https://play.google.com/store/apps/details?id=com.jahanzeb.dev.firebase.guide', '', '', 'star', 25, '#D92525')}
            {drawerSectionSub('Guide Me', 'mailto:jahanzebsupp@gmail.com', 'Libraries', '', 'help-network', 25, '#F29F05')}

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize.body-2, opacity: 0.5, color: colors.mainText, justifyContent: 'center', }}>Firebase Guide - React Native</Text>
                <Text style={{ fontSize: fontSize.body-2, opacity: 0.5, color: colors.mainText, justifyContent: 'center', }}>Version : 1.1</Text>
            </View>

        </DrawerContentScrollView >
    );
}

const DrawerNew = createDrawerNavigator();

const WelcomeDrawer = () => {
    return (
        <DrawerNew.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>

            <DrawerNew.Screen name="Welcome" component={Welcome}
                options={{ headerShown: false }} />

        </DrawerNew.Navigator>
    )
}

export default WelcomeDrawer



