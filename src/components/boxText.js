import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { fontSize } from './fontSize'


const SubBoxText = ({ title, text, text1, text2, code, code1, code2, size, size1, size2, color, mH, mV, link0, link, link2, image0, image, image2, colorBG, alignText1, Banner, BannerTop , ...props }) => {
    const { colors } = useTheme()
    return (
        <View style={{ backgroundColor: colorBG }} {...props}>
            <View style={{ backgroundColor: color ? color : colors.card, marginHorizontal: mH ? mH : 10, marginVertical: mV ? mV : 5, padding: 10, borderRadius: 16, shadowColor: color ? color : colors.border }}>

                {title && <Text style={{ fontSize: fontSize.mainTitle, color: colors.mainText, fontWeight: 'bold' }}>{title}</Text>}
                {text && <Text style={{ color: colors.mainText, fontSize: size ? size : fontSize.subtitle, marginTop: title ? 10 : 0 }}>{text}</Text>}
                {image0 && image0}
                {code && code}
                {link0 && link0}
                {text1 && <Text style={{ color: colors.mainText, fontSize: size1 ? size1 : fontSize.subtitle, marginTop: title ? 10 : 0, textAlign: alignText1 ? 'center' : 'auto' }}>{text1}</Text>}
                {image && image}
                {code1 && code1}
                {link && link}
                {text2 && <Text style={{ color: colors.mainText, fontSize: size2 ? size2 : fontSize.subtitle, marginTop: title ? 10 : 0 }}>{text2}</Text>}
                {image2 && image2}
                {code2 && code2}
                {link2 && link2}
                {Banner && <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:BannerTop }}>{Banner}</View>}

            </View>
        </View>
    )
}

export default SubBoxText