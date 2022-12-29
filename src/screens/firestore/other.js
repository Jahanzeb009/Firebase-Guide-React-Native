import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme, } from '@react-navigation/native';
import { CustomButton2 } from '../../components/customButton';
import { fontSize } from '../../components/fontSize';
import ShowIndicator from '../../components/ShowIndicator';
import { TextInput } from '../../components/textInput';
import firestore from '@react-native-firebase/firestore'
import { CodeSnippet } from '../../components/codeSnippet'
import { ReadData } from './readData';
import CollapsableCard from '../../components/collapsableCard';
import SubBoxText from '../../components/boxText';
import Title from '../../components/Title';
import { BannerCloudFirestore } from '../../admob/adUnitId';
import BN from '../../components/bottomNavigation';

const UserExist = () => {

    const { colors } = useTheme()

    // check user exist or not of current /collection/document 
    const [userInput, setUserInput] = useState('')
    const [checkUser, setCheckUser] = useState('')
    useEffect(() => {
        firestore().collection('newUsersData').doc(userInput).get().then(user => {
            setCheckUser(user.exists)
        })
    }, [userInput])

    const style = StyleSheet.create({
        text: {
            color: colors.mainText, fontSize: fontSize.subtitle, marginTop: 20
        }
    })

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
            <TextInput
                label={'Email/UID'}
                onChangeText={setUserInput}
                placeholder={"Email/UID"}
                keyboardType="email-address"
            />
            <Text style={style.text}>{checkUser.toString()}</Text>
        </View>
    )
}

const CollectionSize = () => {

    const { colors } = useTheme()

    const [userInput, setUserInput] = useState('')
    const [sizeVaue, setSizeVaue] = useState()

    let check = () => firestore().collection(userInput).get().then(document => {
        setSizeVaue(document.size)
    })

    const style = StyleSheet.create({
        text: {
            color: colors.mainText, fontSize: fontSize.subtitle, marginTop: 20
        }
    })


    return (
        <View style={{ marginVertical: 10 }}>
            <SubBoxText color={colors.background} text={"This module return how many documents in your collection"} />

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    label={'Collection Name'}
                    onChangeText={setUserInput}
                    placeholder={"Enter Collection Name"}
                    keyboardType="default"
                    onSubmitEditing={() => { check() }}
                />
                <CustomButton2 title={'check'} onPress={() => { check() }} />

                {userInput ? <Text style={style.text}>Total no. of document{"\n"} in "{userInput}" = {sizeVaue}</Text> : null}
            </View >
        </View >
    )
}

const CheckPath = () => {

    const { colors } = useTheme()

    const [userInput, setUserInput] = useState()

    let path = firestore().collection('newUsersData').doc(userInput).path // get the path of the specific document

    const style = StyleSheet.create({
        text: {
            color: colors.mainText, fontSize: fontSize.subtitle, marginTop: 20
        }
    })

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
            <TextInput
                label={'Email/Uid'}
                onChangeText={setUserInput}
                placeholder={"Enter Email/Uid"}
                keyboardType="default"
            />
            {userInput ? <Text style={style.text}>Path of the {userInput} is = {userInput !== "" ? path : null}</Text> : null}
        </View>
    )
}

const Other = () => {

    return (
        <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <ScrollView >
                <Title text={'This is a live demonstration of how firestore features works'} ml={15} />

                <CollapsableCard data={<ReadData />} title={'Read collection'} />
                <CollapsableCard data={<UserExist />} title={'Check user existence'} />
                <CollapsableCard data={<CollectionSize />} title={'Check collection size'} />
                <CollapsableCard data={<CheckPath />} title={'Check user path'} />

            </ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerCloudFirestore />
            </View>
        </View>
    )
}


const Guide = () => {

    const { colors } = useTheme()

    const exist = `firestore().collection('<CollectionName>').doc('<documentName>').get().then(user => {
    if(user.exists){ // return boolean value
        console.log('user found') 
    } else {
        console.log('user not found)
    }
})`

    const size = `firestore().collection(userInput).get().then(document => {
    console.log(document.size) // return number value
})`

    const path = `firestore().collection(<CollectionName>).doc(<documentName/UID>).path // return path e.g. collectionName/documentName/UID`

    const geoPoint = `firestore().doc('newUsersData/user').update({
    'address.location': new firestore.GeoPoint(13.356421, 23.552213),
})`
    const blobImage = `firestore().doc('newUsersData/user').update({
    'profle.avatar': firestore.Blob.fromBase64String('data:image/png;base64,iVBOR...'),
})`
    const timeStamp = `firestore().doc('newUsersData/user').update({
    'profle.avatar': firestore.Blob.fromBase64String('data:image/png;base64,iVBOR...'),
})`

    const s = StyleSheet.create({
        textStyle: {
            fontSize: fontSize.mainTitle,
            paddingVertical: 10,
            backgroundColor: colors.card,
            padding: 10,
            color: colors.mainText, textAlign: 'justify',
            paddingTop: StatusBar.currentHeight
        },
        otheruse: {
            fontSize: fontSize.subtitle,
            padding: 10,
            paddingBottom: 0,
            color: colors.mainText,

        },
    });

    const [delay, setDelay] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setDelay(true)
        }, 300);
    }, [])

    if (!delay) {
        return <ShowIndicator />
    } else {

        return (
            <View style={{ flex: 1 }}>

                <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[0, 2, 5, 8, 11, 14]}>

                    <View><Text style={s.textStyle}>Check user existance</Text></View>
                    <CodeSnippet data={exist} ViewHeight={200} copyCommand={exist} button />

                    <View><Text style={s.textStyle}>Check collection size</Text></View>
                    <Text style={s.otheruse}>This method will return how many documents in your specific collection</Text>
                    <CodeSnippet data={size} ViewHeight={110} copyCommand={size} button />

                    <View><Text style={s.textStyle}>Check Path</Text></View>
                    <Text style={s.otheruse}>This method will return path of your specific Uid in your specific collection</Text>
                    <CodeSnippet data={path} ViewHeight={60} copyCommand={path} button />

                    <View><Text style={s.textStyle}>GeoPoint</Text></View>
                    <Text style={s.otheruse}>To store GeoPoint values, provide the latitude and longitude to a new instance of the class</Text>
                    <CodeSnippet data={geoPoint} ViewHeight={110} copyCommand={geoPoint} button />

                    <View><Text style={s.textStyle}>Blob Image upload</Text></View>
                    <Text style={s.otheruse}>To store a Blob (for example of a Base64 image string), provide the string to the static fromBase64String method on the class</Text>
                    <CodeSnippet data={blobImage} ViewHeight={110} copyCommand={blobImage} button />

                    <View><Text style={s.textStyle}>Timestamp</Text></View>
                    <Text style={s.otheruse}>When storing timestamps, it is recommended you use the serverTimestamp static method on the FieldValue class. When written to the database, the Firebase servers will write a new timestamp based on their time, rather than the clients. This helps resolve any data consistency issues with different client timezones</Text>
                    <CodeSnippet data={timeStamp} ViewHeight={110} copyCommand={timeStamp} button />

                </ScrollView >

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <BannerCloudFirestore />
                </View>

            </View>
        )
    }
}

const Data = () => {

    return (
        <BN fc={Other} sc={Guide} />
    );
}

export default Data