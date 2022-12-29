import { View, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';
import { CodeSnippet } from '../../components/codeSnippet';
import { LinkInButton } from '../../components/link'
import CollapsableCard from '../../components/collapsableCard';
import SubBoxText from '../../components/boxText';
import { BannerCloudFirestore } from '../../admob/adUnitId';
import { useTheme } from '@react-navigation/native';

const Filter = () => {
    const { colors } = useTheme()

    const filter = `firestore().collection("newUsersData").where('Age', '>=', 15).get()
    .then((userData) => {
        userData.forEach(user => {
            console.log(user.id, user.data());
        })
    })`

    return (
        <View>
            <SubBoxText color={colors.background} title={"Query"} text={"The where( ) method takes three parameters: a field to filter on, a comparison operator, and a value. Cloud Firestore supports the following comparison operators:"} />

            <CodeSnippet ViewHeight={180} data={filter} copyCommand={filter} button />
            <LinkInButton text={'learn more about Query operators'} link={'https://firebase.google.com/docs/firestore/query-data/queries#query_operators'} tf b mr={10} ml={10} />
        </View>
    )
}

const Limit = () => {
    const { colors } = useTheme()
    const limitimg = `firestore().collection("newUsersData").where("Gender", '==', "Female").limit(2).get()
    .then((userData) => {
        userData.forEach(user => {
            console.log(user.id, user.data());
        })
    })`

    const order = `firestore().collection("newUsersData").orderBy('FirstName', 'asc or decs').limit(3).get()
    .then((userData) => {
        userData.forEach(user => {
            console.log(user.id, user.data());
        })
    })`

    return (
        <View>
            <SubBoxText color={colors.background} title={"Limiting"} text={"To limit the number of documents returned from a query, use the limit method on a collection reference"} />
            <CodeSnippet ViewHeight={180} data={limitimg} copyCommand={limitimg} button />
            <SubBoxText title={"Order"} text={"You could also sort data in ac ascending/descending order"} />
            <CodeSnippet ViewHeight={180} data={order} copyCommand={order} button />
            <LinkInButton text={'learn more about Limit Data'} link={'https://firebase.google.com/docs/firestore/query-data/order-limit-data#order_and_limit_data'} tf b mr={10} ml={10} />
        </View>
    )
}



const Query = () => {

    // firestore().collection("newUsersData").where('Age', '<=', 15).get()
    // .then((userData) => {
    //     userData.docs.forEach(user => {
    //         console.log(user.id, user.data());
    //     })
    // })

    // firestore().collection("newUsersData").orderBy("Age", 'desc').startAt(40).endAt(15).get()
    //     .then((userData) => {
    //         userData.forEach(user => {
    //             console.log(user.id, user.data());
    //         })
    //     })

    firestore().collection("newUsersData").where("Gender", '==', "Female").get().then((userData) => {
        userData.forEach(user => {
            console.log(user.id, user.data().FirstName, user.data());
        })
    }
    )

    return (
        <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <ScrollView style={{ flex: 1 }}>
                <SubBoxText text={'Cloud Firestore provides powerful query functionality for specifying which documents you want to retrieve from a collection.'} />

                <CollapsableCard data={<Filter />} title={'Filter'} />
                <CollapsableCard data={<Limit />} title={'Limit & Order'} />

            </ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <BannerCloudFirestore />
            </View>
        </View>
    )
}

export default Query