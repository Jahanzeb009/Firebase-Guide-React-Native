import { View, Text, ScrollView, StyleSheet, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme, } from '@react-navigation/native';
import { CustomButton2 } from '../../components/customButton';
import ShowIndicator from '../../components/ShowIndicator';
import { fontSize } from '../../components/fontSize';
import { CodeSnippet } from '../../components/codeSnippet';
import { TextInput } from '../../components/textInput';
import ImageLoading from '../../components/imageLoading';
import firestore from '@react-native-firebase/firestore'
import toast from '../../components/toast';
import CollapsableCard from '../../components/collapsableCard';
import Title from '../../components/Title';
import SubBoxText from '../../components/boxText';
import { BannerCloudFirestore } from '../../admob/adUnitId';
import BN from '../../components/bottomNavigation';
import { LinkInButton } from '../../components/link';

export const ReadData = () => {

    const { colors } = useTheme()

    const [user, setUser] = useState([])

    //Read Collection

    const [loading, setLoading] = useState(null)

    let read = () => {
        firestore().collection('newUsersData').get().then((user) => {
            setLoading(true)
            if (user) {
                setUser(user.docs)
                setLoading(false)
            } else {
                toast('no data found')
                setLoading(false)
            }
        }).catch((err) => {
            setLoading(false)
            alert(err.message)
        })
    }

    return (
        <View style={{ marginVertical: 10 }}>
            <ScrollView >
                <SubBoxText color={colors.background} text={'Read collection means read all data in specified collection,\nCloud Firestore stores data in Documents, which are stored in Collections. Cloud Firestore creates collections and documents implicitly the first time you add data to the document. You do not need to explicitly create collections or documents'} />

                <CustomButton2 title={'read'} onPress={() => { read() }} />
                {loading ? <ActivityIndicator size={'large'} color={colors.primary} animating={true} /> :
                    <FlatList
                        data={user}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ backgroundColor: colors.card, alignItems: 'center', marginBottom: 10, borderRadius: 16, paddingTop: 10, elevation: 3 }}>
                                    <Text style={{ color: colors.mainText }}>Uid: {item.id}</Text>
                                    <View style={{ flexDirection: 'row', backgroundColor: colors.card, alignItems: 'center', marginBottom: 10, padding: 10, borderRadius: 16 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: colors.mainText }}>FirstName: {item.data().FirstName ? item.data().FirstName : 'null'}{'\n'}
                                                LastName: {item.data().LastName ? item.data().LastName : 'null'}{'\n'}
                                                Age: {item.data().Age ? item.data().Age : 'null'}{'\n'}
                                                Gender: {item.data().Gender ? item.data().Gender : 'null'}</Text>

                                            {item.data().PhoneNumber ? <Text style={{ color: colors.mainText }}>PhoneNumber: {item.data().PhoneNumber ? item.data().PhoneNumber : 'null'}</Text> : <Text style={{ color: colors.mainText }}>Email: {item.data().Email ? item.data().Email : 'null'}</Text>}
                                        </View>
                                        <View >
                                            <ImageLoading uri={item.data().Image || "https://cdn-icons-png.flaticon.com/512/219/219983.png"} width={100} height={100} />
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />}
            </ScrollView>
        </View>
    )
}

const CreateUser = () => {

    const { colors } = useTheme()

    const [userInput, setUserInput] = useState('')

    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [age, setAge] = useState(null)

    let create = () => {
        firestore().collection('newUsersData').doc(userInput).set({
            FirstName: firstName,
            LastName: lastName,
            Age: age
        })
    }
    let createRandom = () => {
        firestore().collection('newUsersData').add({
            FirstName: firstName,
            LastName: lastName,
            Age: age
        })
    }
    return (
        <View style={{ marginVertical: 10 }}>
            <SubBoxText color={colors.background} title={'Specific document ID'}
                text={'Enter User Name and other field to create a new user in firestore with specified document ID'} />

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    label={'Enter Document/User Name'}
                    placeholder={"User Name"}
                    onChangeText={setUserInput} />
                <TextInput
                    label={'FirstName'}
                    onChangeText={setFirstName}
                    placeholder={"FirstName"}
                    keyboardType="default"
                />
                <TextInput
                    label={'lastName'}
                    onChangeText={setLastName}
                    placeholder={"lastName"}
                    keyboardType="default"
                />
                <TextInput
                    label={'Age'}
                    onChangeText={setAge}
                    placeholder={"Age"}
                    keyboardType="number-pad"
                />
                <CustomButton2 title={'Create'} onPress={() => {
                    if (userInput.length == 0) {
                        toast('enter Document ID')
                    } else { create() }
                }} />
            </View>

            <SubBoxText color={colors.background} title={'Random document ID'}
                text={'Enter User Name and other field to create a new user in firestore with random document ID'} />

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    label={'FirstName'}
                    onChangeText={setFirstName}
                    placeholder={"FirstName"}
                    keyboardType="default"
                />
                <TextInput
                    label={'lastName'}
                    onChangeText={setLastName}
                    placeholder={"lastName"}
                    keyboardType="default"
                />
                <TextInput
                    label={'Age'}
                    onChangeText={setAge}
                    placeholder={"Age"}
                    keyboardType="number-pad"
                />
                <CustomButton2 title={'Create'} onPress={() => { createRandom() }} />
            </View>
        </View>
    )
}

const SubData = () => {

    return (
        <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>

            <ScrollView style={{ flex: 1, marginVertical: 10 }}>

                <Title text={'This is a live demonstration of how firestore features works'} ml={15} />

                <CollapsableCard data={<ReadData />} title={'Read Collection'} />
                <CollapsableCard data={<CreateUser />} title={'Create new document/User'} />

            </ScrollView >

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerCloudFirestore />
            </View>

        </View>
    )
}

const Guide = () => {

    const { colors } = useTheme()

    const readCollection = `firestore().collection('newUsersData').get()
    .then(user => console.log(user.docs)
)`

    const readDataSpecificUser = `firestore().collection('newUsersData').doc(auth().currentUser.email).get().then(user => {
        console.log(user.data())
    })`

    const readDataWithQuery = `firestore().collection('newUsersData').where('user_document_in_firebase_document_field_key_e.g_name||age', '==', 'jhanzeb').get().then(user => {
        console.log(user.docs)
    })`

    const readDataWithSnapshot = `firestore().collection('newUsersData').onSnapshot(user => {
        console.log(user.docs)
    })`



    const s = StyleSheet.create({
        textStyle: {
            fontSize: fontSize.mainTitle,
            paddingVertical: 10,
            backgroundColor: colors.card,
            padding: 10,
            color: colors.mainText,
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

                <ScrollView style={{ flex: 1 }}>

                    <View><Text style={s.textStyle}>Read Specific User Data</Text></View>
                    <Text style={s.otheruse}>Fetch whole documents of the current loged in user</Text>
                    <CodeSnippet data={readDataSpecificUser} copyCommand={readDataSpecificUser} />

                    <View><Text style={s.textStyle}>Read Collection</Text></View>
                    <Text style={s.otheruse}>Fetch all documents from collection</Text>
                    <CodeSnippet data={readCollection} ViewHeight={90} copyCommand={readCollection} />
                    <LinkInButton text={'More info related to query'} navigation={"Query"} b tf ml={10} mr={10} mb={10} />

                    <View><Text style={s.textStyle}>Read Data with Query</Text></View>
                    <Text style={s.otheruse}>Fetch all documents that pass the query filter</Text>
                    <CodeSnippet data={readDataWithQuery} ViewHeight={90} copyCommand={readDataWithQuery} />

                    <View><Text style={s.textStyle}>Read Data with Snapshot</Text></View>
                    <Text style={s.otheruse}>Get real time changes from firestore</Text>
                    <CodeSnippet data={readDataWithSnapshot} ViewHeight={90} copyCommand={readDataWithSnapshot} />


                </ScrollView >

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <BannerCloudFirestore />
                </View>

            </View>
        )
    }
}


const Data = () => {

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
            <BN fc={SubData} sc={Guide} />
        );
    }
}
export default Data