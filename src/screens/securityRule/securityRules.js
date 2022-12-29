import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Vibration, StatusBar, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import SubBoxText from '../../components/boxText'
import { CodeSnippet } from '../../components/codeSnippet'
import { fontSize } from '../../components/fontSize'
import Title from '../../components/Title'
import { underline } from '../../components/underline'
import FastImage from 'react-native-fast-image'
import { LinkInButton } from '../../components/link'
import CollapsableCard from '../../components/collapsableCard'
import ShowIndicator from '../../components/ShowIndicator'
import { AnimatedHeaderWithText } from '../../components/animatedHeader'
import { BannerSecurityRules } from '../../admob/adUnitId'

const Data = () => {
  const { colors, dark } = useTheme()

  const firstRed = `match /Users/{userID} {
  allow read , write: if request.auth == userID;
  }`

  const noSecurity = `allow read, write : if true;`

  const tightSecurity = `allow read, write : if false;`

  const allowOnlyOneUser = `allow read, write : if request.auth.uid == 'user-UID';`

  const authRequire = `allow read: if request.auth != null;  `

  const allowAllAuthUser = `allow read, write : if request.auth.uid == request.auth.uid;`

  const VerifiedEmail = `allow read, write : if "auth.token.email_verified === true";`

  const limitUploadSize = `// Only allow uploads of any image file that's less than 5MB
allow write: if request.auth.uid == request.auth.uid 
&& request.resource.size < 5 * 1024 * 1024 
&& request.resource.contentType.matches('image/.*');`

  const changeYourself = `match /Users/{userID} {
  allow read , write: if request.auth.uid == userID;
}`

  const alreadySavaDataInFirestore = `match /Users/{userId} {
  allow read , write : if request.auth.uid == resource.data.userId; 
}`

  const incomingDataInFirestore = `match /Users/{userId} {
  allow write : if request.auth.uid == request.resource.data.userId; 
}`

  const useFunction = `match /Users/{userId} {
  allow write : if incomingData(userId); 
}
fuction incomingData(userId){
  request.auth.uid == request.resource.data.userId;
}`

  // _______________________________________

  // wildcard
  let wildcard = `match /{document=**}{ // ** is wildcard
  allow read, write : if true;
}`

  // method
  let method = `allow create
allow update
allow delete
allow get
allow list`

  // when & where we use these method 

  let whereUse = `allow read: {get ,list}

allow write: {create, update, delete}`

  // detail of method

  let detail = `get: get a single document or single collection
list: get a list of document
create: create a new document
update: update a document
delete: delete a document`

  const syntax = `rules-version = '2';
service <<name>> i.e firebase.storage {
  // match the resource path.
  match <<path>> i.e folderName/ {
    // allow the request if the following condition are true
    allow <<method>> i.e read , write... : if <<condition>>;
  }
}`

  // _______________________________________

  const s = StyleSheet.create({
    textStyle: { fontSize: fontSize.mainTitle, paddingVertical: 10, backgroundColor: colors.card, padding: 10, color: colors.mainText, paddingTop: StatusBar.currentHeight },
    otheruse: { fontSize: fontSize.subtitle, padding: 10, paddingBottom: 0, color: colors.mainText }
  });

  let Collaps = () => {
    return (
      <View>
        <View style={{ padding: 10, backgroundColor: dark ? '#490b0bc0' : '#fb4d4dc0', borderRadius: 16 }}>
          <Text style={{ color: colors.mainText, fontSize: fontSize.mainTitle, fontWeight: 'bold' }}>Alert</Text>
          <Text style={{ color: colors.mainText }}>Sometimes we save users with their {underline("E-mail id or phoneNumber as UID")} in firestore and save
            there {underline('profile pictures')} in cloud Storage with their email address for better understanding while filtering. In that case you
            may face problems while you use {underline("request.auth.uid in security rules")} becasue this method use UID which is
            located in {underline('authentication tab')} which is not match in your firestore UID, you can use {underline("request.auth == userID")}.</Text>
          <FastImage source={require('../../../assets/security_rules/securityRules.png')}
            style={{ width: '100%', height: 90, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
            resizeMode={"contain"} />
        </View>

        <CodeSnippet data={firstRed} ViewHeight={90} copyCommand={firstRed} />

        <View style={{ padding: 10, backgroundColor: colors.card, borderRadius: 16 }}>
          <Text style={{ color: colors.mainText, fontSize: fontSize.mainTitle, fontWeight: 'bold' }}>request.auth.uid</Text>
          <FastImage source={require('../../../assets/security_rules/request.auth.uid.png')}
            style={{ width: '100%', height: 94, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}
            resizeMode={"contain"} />
          <Text style={{ color: colors.mainText, fontSize: fontSize.mainTitle, fontWeight: 'bold' }}>userID</Text>
          <FastImage source={require('../../../assets/security_rules/userID.png')}
            style={{ width: '100%', height: 115, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
            resizeMode={"contain"} />
        </View>
      </View>
    )
  }

  let FirebaseConsole_1 = () => {
    return <SubBoxText image={<FastImage source={require('../../../assets/security_rules/rules_guide.png')} style={{ width: '100%', height: 151, borderRadius: 16, marginTop: 10 }} resizeMode={'contain'} />}
      text={`In your Firebase console, open the Firebase Database tab, there in the upper hand side you can choose the rules tab. You can write and publish the rules from here.`} />
  }

  let FirebaseConsole_2 = () => {
    return <SubBoxText text={`If you have the firebase project initialized locally with Firestore and Storage through Firebase CLI then you would have two rules files created, one for Firestore and other for Storage rules. You can write the rules through here as well.`}
      link={<LinkInButton text={'Firebase CLI'} link={'https://firebase.google.com/docs/rules/manage-deploy#use_the'} b tf />} />
  }

  const scrollViewRef = useRef();

  let ButtonScrollView = ({ text, value }) => {
    return <TouchableOpacity activeOpacity={0.6} onPress={() => { scrollViewRef.current?.scrollTo({ y: value, animated: true }), Vibration.vibrate([1, 2, 1]) }}
      style={{ backgroundColor: colors.card, borderRadius: 160, padding: 10, margin: 2, marginHorizontal: 2, borderWidth: 1, borderColor: colors.border + 60, elevation: 2 }}>
      <Text style={{ color: colors.mainText }}>{text}</Text>
    </TouchableOpacity>
  }

  const offset = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>

      <AnimatedHeaderWithText animatedValue={offset} fc={'#ffffffc7'} bg={'#C5557B'} fs={40} hh={200} t={'Security\nRules'} />

      <ScrollView showsVerticalScrollIndicator={false} onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: offset } } }],
        { useNativeDriver: false }
      )}
        stickyHeaderIndices={[10, 12, 15, 18, 21, 27, 30, 33, 36, 40]} ref={scrollViewRef}
      >

        <View style={{ borderTopRightRadius: 28, borderTopLeftRadius: 28, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }} >

          <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />
        </View>

        <SubBoxText colorBG={colors.background} title={'Firebase Security Rules Language'} text={'Common Expression Language (CEL) described by firebase'} link={<LinkInButton text={'Readme'} link={'https://github.com/google/cel-spec'} b tf />} />

        <SubBoxText title={'Setup Security rules'} text={`There are two methods you can use to write rules in your firebase cloud. You can set them up directly through the Firebase Console or through the Firebase CLI.\n\n1. Firebase Console\n2. Firebase CLI`} />

        <CollapsableCard data={<FirebaseConsole_1 />} title={'1. Firebase Console'} />
        <CollapsableCard data={<FirebaseConsole_2 />} title={'2. Firebase CLI'} />

        <CollapsableCard data={<Collaps />} title={'Readme'} backgroundColor={'#913737'} />

        <Title text={'Content'} bg={colors.background} />

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10, marginVertical: 10, }}>
          <ButtonScrollView text={'1. Syntax'} value={1295} />
          <ButtonScrollView text={'2. No security'} value={1630} />
          <ButtonScrollView text={'3. No access'} value={1877} />
          <ButtonScrollView text={'4. Allow specific'} value={2112} />
          <ButtonScrollView text={'5. Allow authenticated'} value={2325} />
          <ButtonScrollView text={'6. Verified email'} value={2715} />
          <ButtonScrollView text={'7. Change own data'} value={2910} />
          <ButtonScrollView text={'8. Limit upload data'} value={3153} />
          <ButtonScrollView text={'9. Fetch data from firestore'} value={3443} />
          <ButtonScrollView text={'10. Check incoming data'} value={3650} />
          <ButtonScrollView text={'11. Using function'} value={3900} />
        </View>
        <Title text={'We use Firebase Console guide'} />

        <CollapsableCard margin={1} title={'Info'} data={<View>
          <Text style={[s.otheruse]}>The {underline('request.auth')}variable in Cloud Storage Security Rules becomes an object that contains the user's unique ID {underline("request.auth.uid")} and all
            other user information in the token {underline("request.auth.token")}.
            When the user is not authenticated {underline('request.auth')}is {underline("null")} </Text>
        </View>} />

        <View><Text style={s.textStyle}>Syntax</Text></View>
        <CodeSnippet data={syntax} ViewHeight={230} copyCommand={noSecurity} button />

        <View><Text style={s.textStyle}>No Security (Everyone have Access)</Text></View>
        <Text style={[s.otheruse]}>Everyone can access your data and make changes in your data even it can delete your whole database</Text>
        <CodeSnippet data={noSecurity} ViewHeight={60} copyCommand={noSecurity} button />

        <View><Text style={s.textStyle}>No Access (Close Server)</Text></View>
        <Text style={[s.otheruse]}>Nobody can access your database if you want to access your database you have to go to firebase console and make changes</Text>
        <CodeSnippet data={tightSecurity} ViewHeight={60} copyCommand={tightSecurity} button />

        <View><Text style={s.textStyle}>Allow specific user</Text></View>
        <Text style={[s.otheruse]}>You can allow only specific user to make changes in database like Admin</Text>
        <CodeSnippet data={allowOnlyOneUser} ViewHeight={60} copyCommand={allowOnlyOneUser} button />

        <View><Text style={s.textStyle}>Allow authenticated user</Text></View>
        <Text style={[s.otheruse]}>In some scenario, you may want data to be readable by all authenticated users of your application, but not by unauthenticated users.</Text>
        <CodeSnippet data={authRequire} ViewHeight={60} copyCommand={authRequire} button />
        <Text style={[s.otheruse, { textAlign: 'center' }]}>OR</Text>
        <Text style={[s.otheruse]}>You can allow all users who create account in your firebase server</Text>
        <CodeSnippet data={allowAllAuthUser} ViewHeight={60} copyCommand={allowAllAuthUser} button />

        <View><Text style={s.textStyle}>Verified Email</Text></View>
        <Text style={[s.otheruse]}>You can allow who have verified email</Text>
        <CodeSnippet data={VerifiedEmail} ViewHeight={60} copyCommand={VerifiedEmail} button />

        <View><Text style={s.textStyle}>Change own data only</Text></View>
        <Text style={[s.otheruse]}>All user can read write their own data only</Text>
        <CodeSnippet data={changeYourself} ViewHeight={110} copyCommand={changeYourself} button />

        <View><Text style={s.textStyle}>Limit upload size</Text></View>
        <Text style={[s.otheruse]}>You can allow user to limit upload data in your cloud storage</Text>
        <CodeSnippet data={limitUploadSize} ViewHeight={130} copyCommand={limitUploadSize} button />

        <View><Text style={s.textStyle}>Fetch data from Firestore</Text></View>
        <Text style={[s.otheruse]}>You can apply condtion on your already save data in your firestore database</Text>
        <Text style={[s.otheruse]}>Suppose we save every user UID in firestore db and we want to check while user try to read , write in his data we use {underline('resource.data.userId')} is this {underline("userId is a field title")}</Text>
        <CodeSnippet data={alreadySavaDataInFirestore} ViewHeight={110} copyCommand={alreadySavaDataInFirestore} button />

        <View><Text style={s.textStyle}>Check incoming data from user</Text></View>
        <Text style={[s.otheruse]}>You can apply condtion on incoming data while user trying to write in database</Text>
        <Text style={[s.otheruse]}>Suppose we save every user UID in firestore db and we want to check while user try to read , write in his data we use {underline('request.resource.data.userId')} is this {underline("userId is a field title")}</Text>
        <CodeSnippet data={incomingDataInFirestore} ViewHeight={110} copyCommand={incomingDataInFirestore} button />

        <View><Text style={s.textStyle}>Using fuction</Text></View>
        <CodeSnippet data={useFunction} ViewHeight={180} copyCommand={useFunction} button />

      </ScrollView>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <BannerSecurityRules />
      </View>

    </View>
  )
}

const SecurityRules = () => {

  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 1);
  }, [])

  if (!delay) {
    return <ShowIndicator />
  } else {
    return <Data />
  }
}
export default SecurityRules