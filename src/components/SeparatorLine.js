import { StyleSheet, View } from "react-native"


export default function Separator() {
    return (<View style={s.separator} />
    )
}

const s = StyleSheet.create({
    separator: {
        marginVertical: 5,
        borderBottomColor: "#1f1e1eff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        margin: 10
    }
})