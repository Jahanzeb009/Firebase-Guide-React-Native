import { ToastAndroid } from "react-native";

function toast (msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
}

export default toast