import { Dimensions, FlatList, Linking, Text, TouchableOpacity, Vibration, View } from "react-native"
import React, { useState } from 'react'
import { useNavigation, useTheme } from "@react-navigation/native"
import { TouchableRipple } from "react-native-paper"

export let linkInText = (text, navigation, link, fontSize) => {
    const { height, width } = Dimensions.get('window')

    let b = width.toFixed(0) * 0.04

    const { colors } = useTheme()

    const { navigate } = useNavigation()

    let font = fontSize ? fontSize : b

    const [color, setcolor] = useState('#3496cf')

    let textOnPress = () => {
        if (navigation) {
            navigate(navigation)
        } else if (link) {
            Linking.openURL(link)
        }
        Vibration.vibrate(40)
    }

    return (
        <Text onPressIn={() => (setcolor('#4334cf'))}
            onPressOut={() => setcolor('#3496cf')}
            onPress={() => textOnPress()}
            style={{ backgroundColor: colors.border + 60, alignItems: 'center', fontSize: font }}
        > <Text style={{ textDecorationLine: 'underline', color }}
        >{text}</Text> </Text>
    )
}

export let LinkInButton = ({ text, navigation, link, fontSize, underline, mb, ml, mr, mt, tf, b, br, m }) => {

    const { height, width } = Dimensions.get('window')

    let boby = width.toFixed(0) * 0.04

    const { colors } = useTheme()

    const { navigate } = useNavigation()

    let font = fontSize ? fontSize : boby
    let under = underline ? 'none' : 'underline'

    const [color, setcolor] = useState('#3496cf')

    let OnPress = () => {
        if (navigation) {
            navigate(navigation)
        } else if (link) {
            Linking.openURL(link)
        }
        Vibration.vibrate(40)
    }

    return (
        <TouchableRipple
            borderless
            activeOpacity={0.6}
            onPress={() => OnPress()}
            rippleColor="#13141530"
            style={{
                padding: 5,
                marginLeft: ml,
                marginTop: mt,
                marginRight: mr,
                marginBottom: mb,
                borderRadius: br ? br : 16,
                margin: m,
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'center',
                backgroundColor: colors.border + 60
            }}
            onPressIn={() => (setcolor('#3465cf'))}
            onPressOut={() => setcolor('#3496cf')}
        >
            <View >
                <Text style={{ textDecorationLine: under, color: color, fontSize: font, textTransform: tf ? 'uppercase' : 'none', fontWeight: b ? 'bold' : 'normal' }} >
                    {text}
                </Text>
            </View>
        </TouchableRipple >
    )
}