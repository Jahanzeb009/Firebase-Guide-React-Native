import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'
import Collapsible from 'react-native-collapsible'
import { fontSize } from './fontSize'

const CollapsableCard = ({ data, title, backgroundColor, margin }) => {
    const { colors } = useTheme()

    const [collaps, setCollaps] = useState(true)

    const s = StyleSheet.create({
        view: { backgroundColor: backgroundColor ? backgroundColor + 99 : colors.card + 99, borderRadius: 20, paddingHorizontal: 10, paddingVertical: !collaps ? 10 : 0, margin: margin ? margin : 10, marginBottom: 5, borderWidth: 2, borderColor: backgroundColor ? backgroundColor + 60 : colors.border + 60 },
    });

    return (
        <View style={s.view}>
            <TouchableOpacity onPress={() => { setCollaps(!collaps), Vibration.vibrate(30) }} style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ paddingLeft: 5, flex: 1, fontSize: collaps ? fontSize.subtitle : fontSize.mainTitle, color: colors.mainText, fontWeight: 'bold', }}>{title}</Text>
                <IconButton icon={collaps ? 'menu-down' : 'menu-up'} size={collaps ? 30 : 40} style={{ margin: 0 }} iconColor={colors.mainText} />
            </TouchableOpacity>
            <Collapsible collapsed={collaps}>
                {data}
            </Collapsible>
        </View>
    )
}

export default CollapsableCard