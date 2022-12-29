import { View, Text, ScrollView, StyleSheet, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme, } from '@react-navigation/native';
import { CustomButton2 } from '../../components/customButton';
import { fontSize } from '../../components/fontSize';
import ShowIndicator from '../../components/ShowIndicator';
import bold from '../../components/bold';
import ImageLoading from '../../components/imageLoading';
import { underline } from '../../components/underline';
import { CodeSnippet } from '../../components/codeSnippet';
import { TextInput } from '../../components/textInput';
import firestore from '@react-native-firebase/firestore'
import { ReadData } from './readData';
import toast from '../../components/toast';
import CollapsableCard from '../../components/collapsableCard';
import SubBoxText from '../../components/boxText';
import Title from '../../components/Title';
import { BannerCloudFirestore } from '../../admob/adUnitId';
import BN from '../../components/bottomNavigation';

const SetProfile = () => {
  const { colors } = useTheme()

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [age, setAge] = useState('')

  let update = () => {

    return firestore().collection('newUsersData').doc('user').set({
      FirstName: firstName,
      LastName: lastName,
      Age: age
    })
  }

  useEffect(() => {
    firestore().collection('newUsersData').doc('user').get().then((user) => {
      setFirstName(user.data().FirstName)
      setLastName(user.data().LastName)
      setAge(user.data().Age)
    })
  }, [])
  return (
    <View style={{ marginVertical: 10 }}>
      <SubBoxText color={colors.background} title={"Set data in existing fields of './user'"} text={"This will delete your old field, it'll overwrite old field data"} />

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          label={'FirstName'}
          onChangeText={setFirstName}
          placeholder={"FirstName"}
          value={firstName}
          keyboardType="default"
        />
        <TextInput
          label={'lastName'}
          onChangeText={setLastName}
          placeholder={"lastName"}
          value={lastName}
          keyboardType="default"
        />
        <TextInput
          label={'Age'}
          onChangeText={setAge}
          placeholder={"Age"}
          value={age}
          keyboardType="number-pad"
        />
        <CustomButton2 title={'Update data'} onPress={() => { update() }} />
      </View>
    </View>
  )

}

const RealTimeData = () => {

  const { colors } = useTheme()

  const [user, setUser] = useState([])

  //Read Collection

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    firestore().collection('newUsersData')
      .onSnapshot((user) => {
        setLoading(true)
        if (user) {
          setUser(user.docs)
          setLoading(false)
        } else {
          toast('no data found')
          setLoading(false)
        }
      })
  }, [])

  //Read Collection

  return (
    <View style={{ marginVertical: 10 }}>
      <ScrollView >
        <SubBoxText color={colors.background} text={"Read collection means read all data in specified collection\nCloud Firestore stores data in Documents, which are stored in Collections. Cloud Firestore creates collections and documents implicitly the first time you add data to the document. You do not need to explicitly create collections or documents"} />

        {loading ? <ActivityIndicator size={'large'} color={colors.primary} animating={true} /> :
          <FlatList
            data={user}
            renderItem={({ item }) => {
              return (
                <View style={{ backgroundColor: colors.card, alignItems: 'center', marginBottom: 10, borderRadius: 16, paddingTop: 10, elevation: 3 }}>
                  <Text style={{ color: colors.mainText }}>Uid: {item.id}</Text>
                  <View style={{ flexDirection: 'row', backgroundColor: colors.background, alignItems: 'center', marginBottom: 10, padding: 10, borderRadius: 16 }}>
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

const UpdateProfile = () => {

  const { colors } = useTheme()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [userData, setUserData] = useState({})

  useEffect(() => {
    firestore().collection('newUsersData').doc('user').get().then((user) => {
      setUserData(user.data())
    })
  }, [firstName, lastName, age])

  let update = () => {

    return firestore().collection('newUsersData').doc('user').update({
      FirstName: firstName,
      LastName: lastName,
      Age: firestore.FieldValue.increment(2),
      'info.address.zipcode': 94040,
      'info.address.location': new firestore.GeoPoint(53.483959, -2.244644),
      'info.avatar': firestore.Blob.fromBase64String('data:image/png;base64,iVBOR...'),
      createdAt: firestore.FieldValue.serverTimestamp(),
      fcmTokens: firestore.FieldValue.arrayRemove('ABCDE2346'),
      fcmTokens2: [1, 2, 3, 4, 5, 67, 1],
    })
  }
  return (
    <View style={{ marginVertical: 10 }}>
      <SubBoxText color={colors.background} title={"Update data in existing field of './user'"} text={"This will not delete your old field, it'll overwrite old field data"} />

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          label={'FirstName'}
          onChangeText={setFirstName}
          value={userData.FirstName}
          placeholder={"FirstName"}
          keyboardType="default"
        />
        <TextInput
          label={'lastName'}
          onChangeText={setLastName}
          value={userData.LastName}
          placeholder={"lastName"}
          keyboardType="default"
        />
        <TextInput
          label={'Age'}
          onChangeText={setAge}
          value={userData.Age}
          placeholder={"Age"}
          keyboardType="number-pad"
        />
        <CustomButton2 title={'Update data'} onPress={() => { update() }} />
      </View>
    </View>
  )
}

const DeleteSignedUser = () => {

  const { colors } = useTheme()

  const [userInput, setUserInput] = useState('')

  const [userDeleted, setUserDeleted] = useState('')

  // delete your selected uID document
  let deleteUser = () => firestore().collection('newUsersData').doc(userInput).get().then((user) => {
    if (user.exists) {
      setUserDeleted('Deleted')
      firestore().collection('newUsersData').doc(userInput).delete()
    } else {
      setUserDeleted('user not found')
    }
  }).catch((err) => {
    setUserDeleted(err.message)
  })

  const style = StyleSheet.create({
    text: {
      color: colors.mainText, fontSize: fontSize.subtitle, marginTop: 20
    }
  })


  return (
    <View style={{ marginVertical: 10 }}>
      <SubBoxText color={colors.background} text={"This will delete your entered document name"} />

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          label={'Email/Uid'}
          onChangeText={setUserInput}
          placeholder={"Enter Email/Uid"}
          keyboardType="default"
        />
        <CustomButton2 title={'check'} onPress={() => { deleteUser() }} />
        {userDeleted !== "" ? <Text style={style.text}>Email / UID : {userInput} = {userDeleted}</Text> : null}
      </View>
    </View>
  )
}

const WriteData = () => {

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <ScrollView style={{ flex: 1 }}>

        <Title text={'This is a live demonstration of how firestore features works'} ml={15} />

        <CollapsableCard data={<ReadData />} title={'Read collection'} />
        <CollapsableCard data={<SetProfile />} title={'Set data'} />
        <CollapsableCard data={<RealTimeData />} title={'Real Time changes'} />
        <CollapsableCard data={<UpdateProfile />} title={'Update data'} />
        <CollapsableCard data={<DeleteSignedUser />} title={'Delete document/user'} />

      </ScrollView>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <BannerCloudFirestore />
      </View>

    </View>
  )
}


const Guide = () => {

  const { colors } = useTheme()

  const setCustomUID = `firestore().collection(<CollectionName>).doc(<documentName/UID>).set({
    FirstName: 'someValue1',
    LastName: 'someValue2'
})`

  const setRandomUID = `firestore().collection(<CollectionName>).set({
    FirstName: 'someValue1',
    LastName: 'someValue2'
})`

  const realtime = `firestore().collection('newUsersData')
.onSnapshot((user) => {
    setLoading(true)
    if (user) {
        setUser(user.docs)
        setLoading(false)
    } else {
        toast('no data found')
        setLoading(false)
    }
})`

  const update = `firestore().collection(<CollectionName>).doc(<documentName/UID>).update({
  newValue: 'someValue'
})`

  const updateButDelete = `firestore().collection(<CollectionName>).doc(<documentName/UID>).set({
  FirstName: 'someValue1',
  LastName: 'someValue2'
})`


  const deleteUser = `firestore().collection(<CollectionName>).doc(<documentName/UID>).get().then((user) => {
  if (user.exists) { // return boolean value
      firestore().collection(<CollectionName>).doc(<documentName/UID>).delete()
      console.log('Deleted')
  } else {
      console.log('user not found')
  }
})`

  const UserField = `firestore().collection(<CollectionName>).doc(<documentName/UID>).get().then((user) => {
  if (user.exists) {
      console.log(user.data()) // your data is located in user/data()/our-data

      firestore().collection(<CollectionName>).doc(<documentName/UID>).update({
          FirstName: 'Muhammad',
          LastName: 'Jahanzeb',
          Age: firestore.FieldValue.delete() // this will delete your specific field
      })
  } else {
      console.log('invaild input');
  }
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

        <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[0, 4, 7, 10, 13, 16, 20]}>

          <View><Text style={s.textStyle}>Set custom Uid/Document name</Text></View>
          <Text style={s.otheruse}>If you want to add document in your selected collection with your specific uid then add after {underline(".collection('collectionName')")} tag {underline(".doc('your_specific_Uid')")}</Text>
          <Text style={s.otheruse}>{bold("Advantage of custom Uid")}{'\n'}{'\n'}1. Ease in searching users{'\n'}2. Document will arrange according to your desire{'\n'}{'\n'}Mostly we use email as Uid because Email is different from other your </Text>
          <CodeSnippet data={setCustomUID} ViewHeight={140} copyCommand={setCustomUID} button />

          <View><Text style={s.textStyle}>Set random Uid/Document name</Text></View>
          <Text style={s.otheruse}>If you want to add document in your selected collection with your specific uid then add after {underline(".collection('collectionName')")} tag {underline(".doc('your_specific_Uid')")}</Text>
          <CodeSnippet data={setRandomUID} ViewHeight={140} copyCommand={setRandomUID} button />

          <View><Text style={s.textStyle}>RealTime data</Text></View>
          <Text style={s.otheruse}>View changes instant without reloading component</Text>
          <CodeSnippet data={realtime} ViewHeight={300} copyCommand={realtime} button />

          <View><Text style={s.textStyle}>Delete specific document</Text></View>
          <Text style={s.otheruse}>You cannot delete an entire collection without use of a {underline("Firebase Admin SDK")}</Text>
          <CodeSnippet data={deleteUser} ViewHeight={230} copyCommand={deleteUser} button />

          <View><Text style={s.textStyle}>Delete specific field</Text></View>
          <CodeSnippet data={UserField} ViewHeight={340} copyCommand={UserField} button />

          <View><Text style={s.textStyle}>Update specific field</Text></View>
          <Text style={s.otheruse}>This method will update your requested data without deleting your old data/fields</Text>
          <CodeSnippet data={update} ViewHeight={110} copyCommand={update} button />

          <View><Text style={s.textStyle}>Update field data</Text></View>
          <Text style={s.otheruse}>This method will not update your requested data{'\n'}This method delete your old values/fields and set new values/fields in specified document</Text>
          <CodeSnippet data={updateButDelete} ViewHeight={140} copyCommand={updateButDelete} button />

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
    <BN fc={WriteData} sc={Guide} />
  );
}

export default Data