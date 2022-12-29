import { View, Text, StatusBar, ScrollView, Vibration, ToastAndroid, Alert, StyleSheet, } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, IconButton, TouchableRipple, TextInput, HelperText } from 'react-native-paper'
import { useTheme } from '@react-navigation/native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import PushNotificationSingleDevice, { TestNotifications } from '../pushNotification'
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import ImageLoading from '../../components/imageLoading'
import Clipboard from '@react-native-clipboard/clipboard'
import { fontSize } from '../../components/fontSize'
import bold from '../../components/bold'

const AdminPanel = () => {

    const { colors } = useTheme()

    const toast = text => ToastAndroid.show(text, ToastAndroid.SHORT)

    const [value, setValue] = useState({
        title: "",
        description: "",
        image: "",
        imagePath: ""
    })

    let chooseImage = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true,

        }).then(image => {
            setValue(pre => ({ ...pre, imagePath: image.path }))
        })
    }

    //It show Text in List of all recent push notifications images and titles 
    const [getListText, setGetListText] = useState(false)

    const uploadImage = () => {

        storage().ref(`adminPanel/${value.title}`).putFile(value.imagePath).then((user) => {

            // console.log(((user.bytesTransferred) / 1048576).toFixed(2))
            // console.log(((user.totalBytes) / 1048576).toFixed(2))

            storage().ref('adminPanel/').child(value.title).getDownloadURL().then(URL => {
                setValue(pre => ({ ...pre, image: URL }))
            })

        }).catch((err) => {
            alert(err.message)
        })
    }

    const [userList, setUserList] = useState([])

    const listItem = () => {
        storage().ref().child('adminPanel/').listAll()
            .then(res => {
                setUserList([])
                res.items.forEach((item) => {
                    item.getDownloadURL().then(user => {
                        setUserList((re) => [...re, { name: item.name, link: user }].sort())
                    })
                })
                setGetListText(true)
            })
            .catch(err => {
                setGetListText(false)
                alert(err.message);
            })
    }

    let ListItemAlert = (u) => {
        Alert.alert('Image URL', u.link, [
            {
                text: 'Paste it URL & Title field',
                onPress: () => { setValue(pre => ({ ...pre, image: u.link, title: u.name })) }
            }, {
                text: 'copy',
                onPress: () => { Clipboard.setString(u.link), toast('copied') }
            }, {
                text: 'Cancel',
                onPress: () => { }
            }
        ])
    }

    const [inputs, setInputs] = useState([]);

    const addHandler = () => {
        const _inputs = [...inputs];
        _inputs.push({ key: '', name: '', value: '' });
        setInputs(_inputs)
    }

    const deleteHandler = (key) => {
        const _inputs = inputs.filter((input, index) => index != key);
        setInputs(_inputs);
    }

    const inputHandler = (text, key) => {
        const _inputs = [...inputs];
        _inputs[key].value = text;
        _inputs[key].key = key;
        setInputs(_inputs);
    }
    const inputHandler2 = (text, key) => {
        const _inputs = [...inputs];
        _inputs[key].name = text;
        setInputs(_inputs);
    }

    // convert nested arrays and object to simple one object
    let b = inputs.map((input, index) => ({ [input.value]: input.name }))

    let a = {}
    for (let i = 0; i < b.length; i++) {
        Object.assign(a, b[i])
    }

    // All refs

    let titleRef = useRef()
    let descriptionRef = useRef()

    let styles = StyleSheet.create({
        TextInput: {
            backgroundColor: colors.background, marginTop: 10, color: colors.mainText
        }
    })

    const [token, setToken] = useState({
        tokens: [],
        totalTokenNo: 0,
        showTotalTokenNo: false,
        showLoading: false
    })

    let FetchTokens = () => {
        setToken(pre => ({ ...pre, showLoading: true }))

        firestore().collection('userTokens').get().then(val => {
            let allTokens = val.docs.map(data => {
                return data.data().token
            })
            setToken(() => ({ tokens: allTokens, totalTokenNo: allTokens.length, showTotalTokenNo: true, showLoading: false }))
        })
    }

    let SendNotification = () => PushNotificationSingleDevice(value.title, value.description, value.image, null, token.tokens)


    return (
        <ScrollView style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: colors.background, marginHorizontal: 10, }}>

            {/* Demo notification */}
            <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 20, padding: 10, backgroundColor: colors.border + 50 }}>
                <View style={{ backgroundColor: colors.border, borderRadius: 60, width: 20, aspectRatio: 1, }} ></View>

                <View style={{ backgroundColor: colors.card, borderRadius: 10, padding: 10, marginTop: StatusBar.currentHeight / 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

                    <View style={{ flex: 1, justifyContent: 'space-around', }}>
                        <Text style={{ color: colors.mainText, fontWeight: 'bold' }}>{value.title ? value.title : "Title"}</Text>
                        <Text style={{ color: colors.mainText, opacity: 0.8, }} numberOfLines={2}>{value.description ? value.description : "Description"}</Text>
                    </View>

                    {value.image === '' ? <View style={{ width: 50, aspectRatio: 1, borderRadius: 10, backgroundColor: colors.border }} >
                        <IconButton icon='image' iconColor={colors.mainText} />
                    </View> :
                        <ImageLoading uri={value.image} width={50} height={50} roundness={10} backgroundColor={colors.card} />
                    }
                </View>
            </View>

            {/* All textInputs */}
            <View>
                <TextInput
                    ref={titleRef}
                    placeholder={'Enter Title'}
                    placeholderTextColor={colors.border}
                    textColor={colors.mainText}
                    mode='outlined'
                    outlineColor={colors.border + 50}
                    activeOutlineColor={colors.primary}
                    left={<TextInput.Icon icon={'format-text'} color={colors.mainText + 50} />}
                    value={value.title}
                    style={styles.TextInput}
                    onChangeText={(t) => setValue(pre => ({ ...pre, title: t }))}
                />
                <TextInput
                ref={descriptionRef}
                    placeholder={'Enter Description'}
                    placeholderTextColor={colors.border}
                    textColor={colors.mainText}
                    mode='outlined'
                    outlineColor={colors.border + 50}
                    activeOutlineColor={colors.primary}
                    value={value.description}
                    style={styles.TextInput}
                    onChangeText={(t) => setValue(pre => ({ ...pre, description: t }))}
                    left={<TextInput.Icon icon={'text'} color={colors.mainText + 50} />}
                />
                <TextInput
                    textContentType='URL'
                    placeholder={'Enter Image URL'}
                    placeholderTextColor={colors.border}
                    textColor={colors.mainText}
                    mode='outlined'
                    outlineColor={colors.border + 50}
                    activeOutlineColor={colors.primary}
                    value={value.image}
                    style={styles.TextInput}
                    onChangeText={(t) => setValue(pre => ({ ...pre, image: t }))}
                    left={<TextInput.Icon icon={'image'} color={colors.notification }  />}
                />
                <HelperText style={{color:colors.mainText+99}} type='info' >
                    You can add a URL of the image or Pick from phone storage{'\n'}by default you can't upload image to {bold('PUSH NOTIFICATION')}. So, first you select image then press {bold("UPLOAD IMAGE")} button then image link will bhi automatically generate and put in your URL field, image will save into your {bold('FIREBASE STORAGE')}
                </HelperText>
            </View>

            {/* Choose Image | upload Image  */}

            <View style={{ flexDirection: 'row' }}>

                <Button icon={'image-multiple'} mode='outlined' color='blue' textColor={colors.mainText} style={{ borderColor: colors.border + 50, flex: 1, borderRadius: 10, marginTop: 10 }}
                    onPress={() => { chooseImage(), setValue(pre => ({ ...pre, image: '' })) }}>Pick Image from Storage</Button>

                {value.imagePath && <Button icon={'image'} mode='outlined' color='blue' textColor={colors.mainText} style={{ marginRight: 10, borderColor: colors.border + 50, borderRadius: 10, marginTop: 10 }}
                    onPress={() => {
                        if (value.title === "") {
                            titleRef.current.focus()
                            toast('Please enter title name of your image')
                        } else {
                            uploadImage()
                        }
                    }}>Upload Image</Button>}

            </View>

            {/* Additional Data button | etc */}

            <View >

                {inputs?.map((input, key) => (

                    <Animated.View key={key} entering={FadeInUp} style={{ alignItem: 'center', justifyContent: 'center', flex: 1 }}>

                        <View style={{ borderRadius: 10, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput textColor={colors.mainText}
                                label='Key'
                                mode='outlined'
                                outlineColor={colors.border + 50}
                                activeOutlineColor={colors.primary}
                                style={[styles.TextInput, { flex: 1, marginTop: 0 }]}
                                placeholder={"Key"} value={input.value} onChangeText={(text) => inputHandler(text, key)} />
                            <TextInput textColor={colors.mainText}
                                label='Value'
                                mode='outlined'
                                outlineColor={colors.border + 50}
                                activeOutlineColor={colors.primary}
                                style={[styles.TextInput, { flex: 1, marginLeft: 10, marginTop: 0 }]}
                                placeholder={"Value"} value={input.name} onChangeText={(text) => inputHandler2(text, key)} />
                            <IconButton icon={'close'} onPress={() => { deleteHandler(key), Vibration.vibrate(20) }} iconColor={colors.mainText} style={{ margin: 0, padding: 0 }} />
                        </View>
                    </Animated.View>
                ))}

                <Button icon={'database'} mode='outlined' color='blue' textColor={colors.mainText} style={{ borderColor: colors.border + 50, borderRadius: 10, marginTop: 10 }}
                    onPress={() => addHandler()}>Additional Data</Button>

            </View>

            {/* Send notification | Test notifications buttons */}
            <View>

                <Button icon={'test-tube'} mode='outlined' color='blue' textColor={colors.mainText} style={{ borderColor: colors.border + 50, borderRadius: 10, marginTop: 10, }}
                    onPress={() => {
                        ToastAndroid.show('minimize your app to see test notification', ToastAndroid.SHORT)
                        TestNotifications()
                    }}>Send Test Notification</Button>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {token.showTotalTokenNo && <Text style={{ marginTop: 10, color: colors.mainText }}>You are sending Notification to {bold(token.totalTokenNo)} users</Text>}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Button icon={'bell-badge'} buttonColor={colors.primary + 50} mode='contained' color='blue' textColor={colors.mainText} style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
                            onPress={() => {
                                if (value.title === "") {
                                    titleRef.current.focus()
                                    toast('Please add a title')
                                } else if (value.description === "") {
                                    descriptionRef.current.focus()
                                    toast('Please add a description')
                                } else {
                                    SendNotification()
                                }
                            }}>Send Notification</Button>

                        <Button icon={'download'} loading={token.showLoading} buttonColor={colors.primary + 50} mode='contained' color='blue' textColor={colors.mainText} style={{ flex: 1, borderRadius: 10, marginLeft: 10, marginTop: 10 }}
                            onPress={() => FetchTokens()}>Fetch All Tokens</Button>

                    </View>
                </View>

            </View>

            <View>

                <Button icon={'format-list-text'} mode='outlined' color='blue' textColor={colors.mainText} style={{ borderColor: colors.border + 50, borderRadius: 10, marginTop: 10 }}
                    onPress={() => listItem()}>Get all recent Push Notification Images</Button>

                {getListText && <Text style={{ color: colors.mainText, fontSize: fontSize.title, fontWeight: 'bold', marginTop: 10 }}>List of all recent notifications Titles and Images</Text>}
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    {userList.map(((u, i) => {
                        return <TouchableRipple borderless rippleColor={colors.mainText} key={i} onPress={() => ListItemAlert(u)} style={{ width: "45%", backgroundColor: colors.card, padding: 10, borderRadius: 16, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ImageLoading uri={u.link} width={100} height={100} />
                                <Text style={{ color: colors.mainText }}>Title: {u.name}</Text>
                            </View>
                        </TouchableRipple>
                    }))}
                </View>


            </View>

        </ScrollView>
    )
}

export default AdminPanel