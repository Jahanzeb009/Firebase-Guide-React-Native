import React, { useRef } from 'react'
import { useTheme } from '@react-navigation/native'
import { Animated, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { CodeSnippet } from '../../components/codeSnippet'
import { LinkInButton } from '../../components/link'
import YoutubePlayerCustom from '../../components/youtubePlayer'
import SubBoxText from '../../components/boxText'
import Title from '../../components/Title'
import { underline } from '../../components/underline'
import AnimatedHeaderWithImage from '../../components/animatedHeader'
import { BannerStorage } from '../../admob/adUnitId'
import { IconButton } from 'react-native-paper'
import { fontSize } from '../../components/fontSize'

const Storage = ({navigation}) => {

  const { colors, dark } = useTheme()

  let data1 = `npm i @react-native-firebase/storage`
  let data2 = `yarn add @react-native-firebase/storage`

  const offset = useRef(new Animated.Value(0)).current;

  return (

    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

      <AnimatedHeaderWithImage animatedValue={offset} hh={175} ih={200} bg={'#00a1b3'} source={require('../../../assets/header_images/storage.png')} />

      <ScrollView showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

          <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />

          <SubBoxText color={'#ff53532f'} text={<Text>This module requires that the {underline("@react-native-firebase/app")} module is already setup and installed.</Text>} link={<LinkInButton b mt={10} text={'@react-native-firebase/app'} navigation={'MainInstallation'} />} />

          <SubBoxText title={'What is Cloud Storage'} text={'Cloud Storage for Firebase is built for app developers who need to store and serve user-generated content, such as photos or videos.'} />

          <CodeSnippet data={data1} ViewHeight={60} copyCommand={data1} button />
          <CodeSnippet data={data2} ViewHeight={60} copyCommand={data2} button />

          <SubBoxText title={'Addons'} />
          <TouchableOpacity onPress={() => { navigation.navigate('UploadImage') }} activeOpacity={0.6} style={{ backgroundColor: '#ddaf25' + 40, flex: 1, height: 100, borderRadius: 16, margin: 10, marginTop: 5, alignItems: 'center', justifyContent: 'center', borderColor: '#ddaf25' + 50, borderWidth: 2 }}>
            <View style={{ flex: .6, justifyContent: 'center', alignItems: 'center' }}>
              <IconButton icon={'tray-arrow-up'} size={30} iconColor={'#ddaf25'} style={{ margin: 0, padding: 0 }} />
            </View>
            <Text style={{ flex: .4, color: colors.mainText, textAlign: 'center', fontSize:fontSize.body }}>Upload / Get Images</Text>
          </TouchableOpacity>

          <Title text={'What does it do'} />
          <YoutubePlayerCustom id={'_tyjqozrEPY'} />
        </View>
      </ScrollView>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <BannerStorage />
      </View>

    </View>
  )
}

export default Storage