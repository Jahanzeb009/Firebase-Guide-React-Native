import { View, Text, ScrollView, FlatList, Animated, StatusBar, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { useTheme } from '@react-navigation/native'
import { AnimatedHeaderWithText } from '../../components/animatedHeader'
import { fontSize } from '../../components/fontSize'
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import ImageLoading from '../../components/imageLoading'
import { BannerLibrary_credits} from '../../admob/adUnitId'

const Libraries = () => {

  const { colors } = useTheme()

  let lib = [
    { libName: '@flyerhq/react-native-link-preview', libLink: 'https://github.com/flyerhq/react-native-link-preview#readme', version: '^1.6.0' },
    { libName: '@react-native-async-storage/async-storage', libLink: 'https://github.com/react-native-async-storage/async-storage#readme', version: '^1.17.10' },
    { libName: '@react-native-clipboard/clipboard', libLink: 'https://www.npmjs.com/package/@react-native-clipboard/clipboard', version: '^1.11.0' },
    { libName: '@react-native-firebase/app', libLink: 'https://github.com/invertase/react-native-firebase/tree/main', version: '^15.7.0' },
    { libName: '@react-native-firebase/auth', libLink: 'https://github.com/invertase/react-native-firebase/tree/main', version: '^15.7.0' },
    { libName: '@react-native-firebase/storage', libLink: 'https://github.com/invertase/react-native-firebase/tree/main', version: '^15.7.0' },
    { libName: '@react-native-firebase/firestore', libLink: 'https://github.com/invertase/react-native-firebase/tree/main', version: '^15.7.0' },
    { libName: '@react-native-google-signin', libLink: 'https://github.com/react-native-google-signin/google-signin', version: '^8.0.0' },
    { libName: '@react-navigation/drawer', libLink: 'https://reactnavigation.org/docs/drawer-based-navigation/', version: '^6.4.4' },
    { libName: '@react-navigation/native', libLink: 'https://reactnavigation.org/docs/getting-started/', version: '^6.0.12' },
    { libName: '@react-navigation/native-stack', libLink: 'https://reactnavigation.org/docs/hello-react-navigation', version: '^6.8.0' },
    { libName: 'react-native-code-editor', libLink: 'https://github.com/RivasCVA/react-native-code-editor', version: '^1.2.2' },
    { libName: 'lottie-react-native', libLink: 'https://www.npmjs.com/package/lottie-react-native', version: '^5.1.4' },
    { libName: 'react-native', libLink: 'https://www.npmjs.com/package/react-native', version: '0.70.1' },
    { libName: 'react-native-animated-loader', libLink: 'https://www.npmjs.com/package/react-native-animated-loader', version: '^1.0.0' },
    { libName: 'react-native-collapsible', libLink: 'https://www.npmjs.com/package/react-native-collapsible', version: '^1.6.0' },
    { libName: 'react-native-fast-image', libLink: 'https://github.com/DylanVann/react-native-fast-image', version: '^8.6.1' },
    { libName: 'react-native-fbsdk-next', libLink: 'https://www.npmjs.com/package/react-native-fbsdk-next', version: '^11.0.0' },
    { libName: 'react-native-gesture-handler', libLink: 'https://www.npmjs.com/package/react-native-gesture-handler', version: '^2.6.2' },
    { libName: 'react-native-iap@Next', libLink: 'https://www.npmjs.com/package/react-native-iap', version: '^11.0.0-rc.7' },
    { libName: 'react-native-image-modal', libLink: 'https://www.npmjs.com/package/react-native-image-modal', version: '^2.0.4' },
    // { libName: 'react-native-image-header-scroll-view', libLink: 'https://www.npmjs.com/package/react-native-image-header-scroll-view', version: '^1.0.0' },
    { libName: 'react-native-image-picker', libLink: 'https://www.npmjs.com/package/react-native-image-picker', version: '^4.10.0' },
    { libName: 'react-native-in-app-review', libLink: 'https://www.npmjs.com/package/react-native-in-app-review', version: '^4.1.1' },
    { libName: 'react-native-linear-gradient', libLink: 'https://www.npmjs.com/package/react-native-linear-gradient', version: '^2.6.2' },
    { libName: 'react-native-paper', libLink: 'https://www.npmjs.com/package/react-native-paper', version: '^5.0.0-rc.6' },
    { libName: 'react-native-reanimated', libLink: 'https://www.npmjs.com/package/react-native-reanimated', version: '^2.10.0' },
    { libName: 'react-native-safe-area-context', libLink: 'https://www.npmjs.com/package/react-native-safe-area-context', version: '^4.3.3' },
    { libName: 'react-native-screens', libLink: 'https://www.npmjs.com/package/react-native-screens', version: '^3.17.0' },
    { libName: 'react-native-twitter-signin', libLink: 'https://github.com/GoldenOwlAsia/react-native-twitter-signin', version: '^1.1.1' },
    { libName: 'react-native-vector-icons', libLink: 'https://npmjs.com/package/react-native-vector-icons', version: '^9.2.0' },
    { libName: 'react-native-webview', libLink: 'https://npmjs.com/package/react-native-webview', version: '^11.23.1' },
    { libName: 'react-native-youtube-iframe', libLink: 'https://github.com/GoldenOwlAsia/react-native-youtube-iframe', version: '^2.2.2' }
  ]

  const offset = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create({
    previewContainer: {
      backgroundColor: colors.card,
      color: colors.mainText,
      borderRadius: 16,
      marginTop: 16,
      overflow: 'hidden',
    },
  })
  return (
    <View style={{ backgroundColor: colors.card , flex:1}}>
      <AnimatedHeaderWithText animatedValue={offset} fc={'#ffffffc7'} bg={'#146152'} fs={60} hh={200} t={'Libraries'} />

      <ScrollView showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}>
        <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.background, marginTop: 175 + StatusBar.currentHeight * 2 }}>

          <View style={{ width: 40, height: 7, marginVertical: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: colors.border + 99, borderRadius: 50 }} />
          {/* <View style={{backgroundColor:colors.card}}> */}
          {/* <LinkPreview
            enableAnimation
            containerStyle={styles.previewContainer}
            text='https://flyer.chat'
          /> */}
          {/* </View> */}

          {/* <LinkPreview
            containerStyle={styles.previewContainer}
            enableAnimation
            text='https://flyer.chat'
          /> */}

          {/* <Text style={{ color: colors.mainText, fontSize: fontSize.mainTitle, fontWeight: 'bold' }}>Setting</Text> */}

          {/* <Text>Data is collected from </Text>
    
      <Text>tell a friend</Text>
      <Text>send us feedback</Text>
      <Text>about</Text>
      <Text>This app use react native v0.70.1 with latest rnfirebase v15.6.0</Text>
      <Text>App version 1.0</Text> */}

          {/* {lib.map((v, k) => {
        return (
          <TouchableOpacity key={k} activeOpacity={0.6} onPress={() => { Linking.openURL(v.libLink), Vibration.vibrate([1, 1, 1, 1]) }} style={{
            marginHorizontal: 10, marginVertical: 5, backgroundColor: colors.card,
            borderRadius: 16, padding: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border + 90,
          }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ color: colors.mainText, flex: 1, fontWeight: 'bold' }}>{k + 1}. {v.libName}</Text>
              <Text style={{ color: colors.mainText, textAlign: 'right' }}>{v.version}</Text>
            </View>
            <IconButton icon={'chevron-right'} />
          </TouchableOpacity>
        )
      })} */}

          <Text style={{ color: colors.mainText, fontSize: fontSize.subtitle, margin: 10 }}>This application is built with usage of open source community libraries. This is my thanks to that creators.</Text>

          <FlatList
            data={lib}
            renderItem={({ item, index }) => {
              return (
                <LinkPreview
                  header='header'
                  // renderHeader={()=><Text style={{backgroundColor:'pink',}}>asd;lkfjgsfgk</Text>}
                  renderLinkPreview={({ previewData }) => {
                    return (
                      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }} >
                        <View style={{ flex: 1 }}>
                          <Text style={{ backgroundColor: colors.card, padding: 10, color: colors.mainText }}>{index + 1}: {item.libName}</Text>
                          <Text style={{ backgroundColor: colors.card, padding: 10, color: colors.mainText }}>version: {item.version}</Text>
                        </View>
                        <ImageLoading uri={previewData?.image?.url} height={115} width={200} roundness={20} />
                      </View>
                    )
                  }}
                  metadataContainerStyle={{ backgroundColor: 'red', }}
                  metadataTextContainerStyle={{ backgroundColor: 'orange', }}
                  // renderImage={({url,height,width})=><Image source={{uri:url}} style={{resizeMode:'contain',width:'100%', height:100}}/>}
                  containerStyle={styles.previewContainer}
                  enableAnimation
                  text={item.libLink}
                />
              )
            }}
          />
        </View>
      </ScrollView>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <BannerLibrary_credits/>
      </View>

    </View>
  )
}

export default Libraries