import { View, Text, StatusBar, ScrollView, useColorScheme, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/customButton'
import auth from '@react-native-firebase/auth'
import { useNavigation, useTheme } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import toast from '../components/toast'
import firestore from '@react-native-firebase/firestore'
import ImageLoading from '../components/imageLoading'

const UserScreen = () => {

    const { goBack } = useNavigation()

    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        Age: 0,
        photoURL: auth()?.currentUser?.photoURL
    })

    const { colors } = useTheme()

    let signOut = async () => {
        try {
            await auth().signOut()
            goBack()

        } catch (error) {
            console.log("error.message", error.message);
        }
    }

    let provider = auth().currentUser.providerData[0].providerId
    
    // check user is already signed in or not
    useEffect(() => {

        firestore().collection('newUsersData').doc(auth().currentUser?.email).get().then((user) => {
            if (user.data() === undefined) {

                if (provider === 'google.com') {
                    setUser(pre => ({ ...pre, FirstName: auth().currentUser.displayName }))
                } else if (provider === 'twitter.com') {
                    setUser(pre => ({ ...pre, FirstName: auth().currentUser.displayName }))
                } else if (provider === 'facebook.com') {
                    setUser(pre => ({ ...pre, FirstName: auth().currentUser.displayName }))
                }

            } else if (user.data() !== undefined) {
                setUser(user.data())
            }
        })
    }, [])

    const s = StyleSheet.create({
        mainView: {
            padding: 10,
            margin: 10,
            borderRadius: 20,
        },
        input: {
            paddingLeft: 10,
            backgroundColor: colors.card,
            margin: 5
        },
    })

    let input = (placeholder) => {
        return (
            <TextInput
                mode='outlined'
                style={s.input}
                label={placeholder}
                placeholder={placeholder}
                outlineColor={colors.border + 99}
                value={user[placeholder]}
                textColor={colors.mainText}
                activeOutlineColor={colors.primary}
                onChangeText={(t) => setUser((prev) => ({ ...prev, [placeholder]: t }))}
                theme={{
                    colors: {
                        text: colors.text,
                        placeholder: '#7a7a7a'
                    }, roundness: 15
                }}
            />
        )
    }

    let otherInput = (placeholder) => {
        return (
            < TextInput
                mode='outlined'
                style={s.input}
                label={placeholder}
                placeholder={placeholder}
                outlineColor={colors.border + 99}
                value={placeholder === 'Email' ? auth().currentUser?.email : auth().currentUser?.providerData[0].providerId}
                textColor={colors.mainText}
                activeOutlineColor={colors.primary}
                disabled
                theme={{
                    colors: {
                        text: colors.text,
                        placeholder: '#7a7a7a'
                    }, roundness: 15
                }}
            />
        )
    }

    let updateProfile = () => {
        firestore().collection('newUsersData').doc(auth().currentUser.email).set({
            FirstName: user.FirstName,
            LastName: user.LastName,
            Age: user.Age,
            photoURL: auth().currentUser.photoURL
        }).then(val => toast('updated successfully'))
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar animated={true} translucent={true} backgroundColor={"transparent"} barStyle={useColorScheme() == 'light' ? 'dark-content' : 'light-content'} />
            {auth().currentUser.isAnonymous ?
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={{ color: colors.mainText }}>Your are currently signed in as Anonymous Authentication</Text>
                    <CustomButton
                        title='Sign out'
                        onPress={() => {
                            try {
                                signOut()
                            } catch (e) {
                                alert(e.message)
                            }
                        }}
                    />
                </View>
                :
                <ScrollView style={{ marginTop: 50 }}>

                    <View style={{ alignItems: 'center' }}>
                        <ImageLoading uri={auth()?.currentUser?.photoURL} roundness={100} backgroundColor={colors.card} height={200} width={200} />
                    </View>

                    <View style={s.mainView}>
                        {input("FirstName")}
                        {input("LastName")}
                        {input("Age")}
                        {otherInput("Email")}
                        {otherInput("ProviderId")}

                        {/* Button start */}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                            <CustomButton
                                title='Profile upload'
                                onPress={() => updateProfile()}
                            />

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                            <CustomButton
                                title='Sign out'
                                onPress={() => {
                                    try {
                                        signOut()
                                    } catch (e) {
                                        alert(e.message)
                                    }
                                }}
                            />
                        </View>

                        {/* Button End */}

                    </View>
                </ScrollView >}
        </View>
    );
}

export default UserScreen