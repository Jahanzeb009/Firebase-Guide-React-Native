import { useTheme } from "@react-navigation/native"
import { Text } from "react-native"
import React from "react";
import { fontSize } from "./fontSize";

export const underline = (text) => {
    const { colors } = useTheme()
    return (
        <Text
            style={{ backgroundColor: colors.border + 60 }}>  <Text
                style={{
                    color: colors.primary,
                    textDecorationLine: 'underline', textDecorationColor:'blue',textDecorationStyle:'dotted',
                    fontSize: fontSize.subtitle,
                    fontWeight: 'bold',
                }}>{text}
            </Text>  </Text>

    )
}