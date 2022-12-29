import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { fontSize } from "./fontSize";

export default function CustomButton({ title, onPress, bgStyle, disabled, flex }) {

    const { colors } = useTheme()
    const [color, setColor] = useState(colors.primary)

    const style = StyleSheet.create({
        TOS: {

            borderRadius: 16,
            paddingVertical: 10,
            paddingHorizontal: '8%',
            margin: 4,
            alignItems: 'center',
            alignSelf: 'center',
            shadowColor: '#000',
            elevation: 2,
            marginTop: 8,

            justifyContent: 'center',
            backgroundColor: color,
            flex: flex ? flex : null
        },
        TS: {
            fontSize: fontSize.subtitle,
            textAlign: 'center',
            color: colors.text,
            textTransform: 'uppercase',
            fontWeight: '500',
        }
    })


    return (
        <TouchableRipple
            disabled={disabled}
            borderless
            rippleColor="#68686852"
            onPressIn={() => setColor(colors.card)}
            onPressOut={() => setColor(colors.primary)}
            onPress={() => { onPress(), Vibration.vibrate(35) }}
            style={[style.TOS, { ...bgStyle }]}
        >
            <View style={{ borderRadius: 16 }}>
                <Text style={[style.TS]}>{title}</Text>
            </View>
        </TouchableRipple >
        // <ThemedButton
        //     name="rick"
        //     type="primary"
        //     activityColor="blue"
        //     backgroundColor={colors.primary}
        //     backgroundDarker='orange'
        //     textColor='orange'
        //     raiseLevel={1}
        //     onPress={() => { onPress(), Vibration.vibrate([1, 2, 1]) }}
        // >
        //     {title}
        // </ThemedButton>

    )
}
// export default function CustomButton({ title, onPress, bgStyle, disabled }) {

//     const { colors } = useTheme()
//     const [color, setColor] = useState(colors.primary)

//     const style = StyleSheet.create({
//         TOS: {

//             borderRadius: 16,
//             paddingVertical: 10,
//             paddingHorizontal: '8%',
//             margin: 4,
//             alignSelf: 'center',
//             shadowColor: '#000',
//             elevation: 2,
//             marginTop: 8,
//             justifyContent: 'center',
//             backgroundColor: color,
//         },
//         TS: {
//             fontSize: fontSize.subtitle,
//             textAlign: 'center',
//             color: colors.text,
//             textTransform: 'uppercase',
//             fontWeight: '500',
//         }
//     })


//     return (
//         <TouchableRipple
//             disabled={disabled}
//             borderless
//             rippleColor="#68686852"
//             onPressIn={() => setColor(colors.card)}
//             onPressOut={() => setColor(colors.primary)}
//             onPress={() => { onPress(), Vibration.vibrate([1, 5, 10, 5, 1]) }}
//             style={[style.TOS, { ...bgStyle}]}
//         >
//             <View style={{ borderRadius: 16 }}>
//                 <Text style={[style.TS]}>{title}</Text>
//             </View>
//         </TouchableRipple >
//     )
// }


export function CustomButton2({ title, onPress, bgStyle, textStyle, opacity, ...rest }) {

    const { colors } = useTheme()
    const [color, setColor] = useState(colors.mainText)

    const style = StyleSheet.create({
        TOS: {
            borderRadius: 16,
            paddingVertical: 10,
            paddingHorizontal: '4%',
            margin: 4,
            marginTop: 8,
            alignSelf: 'center',
            shadowColor: '#000',
            justifyContent: 'center',
            backgroundColor: color + 20,
            borderWidth: 1.5,
            borderColor: color + 40,
        },
        TS: {
            fontSize: fontSize.body,
            textAlign: 'center',
            color: colors.mainText,
            textTransform: 'uppercase',
            fontWeight: 'bold',
        }
    })


    return (
        <TouchableRipple
            borderless
            rippleColor="#68686852"
            onPressIn={() => setColor(colors.border)}
            onPressOut={() => setColor(colors.subMainText)}
            onPress={() => { onPress(), Vibration.vibrate(35) }}
            style={{ ...style.TOS, ...bgStyle, }}
            {...rest}
        >
            <View style={{ borderRadius: 16, }}>
                <Text style={{ ...style.TS, ...textStyle }} >{title}</Text>
            </View>
        </TouchableRipple>
    )
}
