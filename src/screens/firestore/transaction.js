import { View, Text, Vibration, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useTheme } from '@react-navigation/native'
import ImageLoading from '../../components/imageLoading'
import { Button } from 'react-native-paper'
import { CodeSnippet } from '../../components/codeSnippet'
import { BannerCloudFirestore } from '../../admob/adUnitId'

const Transaction = () => {

    const { colors } = useTheme()

    const [userData, setUserData] = useState([])

    useEffect(() => {
        firestore().collection('newUsersData').doc("Transaction").onSnapshot((user) => {
            setUserData(user.data())
        })
    }, [])

    let likeUP = () => {
        const ref = firestore().collection('newUsersData').doc('Transaction')

        return firestore().runTransaction(
            async getData => {
                await getData.get(ref).then(user => {
                    getData.update(ref, {
                        like: user.data().like + 1
                    })
                })
            })
    }

    let likeDown = () => {
        const ref = firestore().collection('newUsersData').doc('Transaction')
        return firestore().runTransaction(
            async getData => {
                await getData.get(ref).then(user => {
                    getData.update(ref, {
                        like: user.data().like - 1
                    })
                })
            })
    }

    let data = `const ref = firestore().collection('newUsersData').doc('Transaction')

    return firestore().runTransaction(
        async getData => {
            await getData.get(ref).then(user => {
                getData.update(ref, {
                    like: user.data().like + 1
                })
            })
        })`

    return (
        <View style={{ marginTop: 10, alignItems: 'center', paddingTop:StatusBar.currentHeight , flex:1 }}>

            <View style={{ marginTop: 10, alignItems: 'center' }}>
                <ImageLoading uri={userData.Image} height={200} width={200} />
                <Text style={{ color: colors.mainText, textAlign: 'center', fontSize: 25, margin: 10, }}>{userData.like}</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Button icon={'thumb-up'} style={{ backgroundColor: colors.card, marginHorizontal: 5 }} theme={{ colors: { primary: colors.primary } }} onPress={() => { likeUP(), Vibration.vibrate([1, 1]) }}>Like</Button>
                    <Button icon={'thumb-down'} style={{ backgroundColor: colors.card, marginHorizontal: 5 }} theme={{ colors: { primary: colors.primary } }} onPress={() => { likeDown(), Vibration.vibrate([1, 1]) }}>Like</Button>
                </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerCloudFirestore />
            </View>

            <CodeSnippet data={data} copyCommand={data}  />

        </View>
    )
}

export default Transaction