import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { fontSize } from './fontSize'
import { useTheme } from '@react-navigation/native'

const Title = ({ text, size, center, bg, ml, pt }) => {
    const { colors } = useTheme()
   
    return (
        <View style={{ justifyContent: 'center', alignItems: center ? 'center' : 'flex-start', padding: 5, paddingLeft: ml ? ml : 10, backgroundColor: bg, paddingTop: pt ? StatusBar.currentHeight : null, paddingBottom: pt ? StatusBar.currentHeight / 2 : null }}>
            <Text style={{ fontSize: size ? size : fontSize.mainTitle, color: colors.mainText, fontWeight: 'bold' }}>{text}</Text>
        </View>
    )
}

export default Title