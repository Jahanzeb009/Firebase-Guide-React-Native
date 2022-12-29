import { useTheme } from '@react-navigation/native';
import React from 'react'
import { Animated, Dimensions, Image, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const AnimatedHeaderWithImage = ({ animatedValue, hh, ih, bg, source }) => {
    const HEADER_HEIGHT = hh + StatusBar.currentHeight * 2;
    const insets = useSafeAreaInsets();

    const headerHeight = animatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top, 0],
        extrapolate: 'clamp'
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: -10,
                zIndex: 0,
                height: headerHeight,
                backgroundColor: bg,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            <Image source={source} style={{ resizeMode: 'contain', width: '100%', height: ih }} />
        </Animated.View>
    )
}

export default AnimatedHeaderWithImage;

export const AnimatedHeaderWithText = ({ animatedValue, hh, bg, t, fs, fc }) => {
    const HEADER_HEIGHT = hh + StatusBar.currentHeight * 2;
    const insets = useSafeAreaInsets();

    const { colors } = useTheme()

    const { height, width } = Dimensions.get('window')

    let mT = width.toFixed(0) * 0.065



    const headerHeight = animatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top, 0],
        extrapolate: 'clamp'
    })
    const Text = animatedValue.interpolate({
        inputRange: [1, 500],
        outputRange: [fs, 25],
        extrapolate: 'clamp'
    });

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 0,
                height: headerHeight,
                backgroundColor: bg,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            <Animated.Text style={{ fontSize: Text, color: fc ? fc : colors.mainText, fontWeight: 'bold', textAlign: 'center' }}>{t}</Animated.Text>
        </Animated.View>
    )
}








