import { useTheme } from "@react-navigation/native"
import { Text } from "react-native"
import React from "react"

export default function bold(text) {

    const { colors } = useTheme()

    return (
        <Text style={{ fontWeight: 'bold', color: colors.mainText }} >{text}</Text>
    )
}