import { useTheme } from "@react-navigation/native"
import React from "react"
import { Text, View } from "react-native"
import Lottie from 'lottie-react-native';

export default function ShowIndicator({ textShow, size }) {
    const { colors, dark } = useTheme()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Lottie hardwareAccelerationAndroid source={dark ? require("../../assets/json/3dotsdark.json") : require("../../assets/json/3dotslight.json")} autoPlay loop autoSize style={{ height: size ? size : 120 }} />
            {!textShow && <Text style={{ color: colors.mainText, fontWeight: 'bold' }}>Please wait</Text>}

        </View>
    )
}