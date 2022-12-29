import { View, Text, ScrollView, StatusBar, Animated } from 'react-native'
import React, { useRef } from 'react'
import { LinkInButton } from '../../components/link'
import SubBoxText from '../../components/boxText'
import { useTheme } from '@react-navigation/native'
import { BannerLibrary_credits } from '../../admob/adUnitId'

const Credits = () => {
        const { colors } = useTheme()

        const offset = useRef(new Animated.Value(0)).current;

        let h = offset.interpolate({
                inputRange: [1, 800],
                outputRange: [300, 100],
                extrapolate: 'clamp'
        })

        return (
                <Animated.View style={{ flex: 1 }}>
                  <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )}>

                    <View style={{ marginTop: StatusBar.currentHeight }}>

                      <View style={{ position: 'absolute', left: 10, top: 15, elevation: 3, backgroundColor: colors.card, width: 40, height: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.mainText }}>1</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Animated.Image source={require('../../../assets/credit_rnfirebase.png')} style={{ resizeMode: 'contain', width: h, height: h }} />
                      </View>

                      <SubBoxText title={'RNFirebase Official website for React Native'} text={'Especially thanks to the developer and maintainer, creators of this website'}
                        text1={'All modules (@react-native-firebase/...) I use in this app installed from this website and all content is available in detailed'}
                        link={<LinkInButton text={'link'} link={"https://rnfirebase.io/"} mt={10} b tf />}
                      />
                    </View>

                    <View>

                      <View style={{ position: 'absolute', left: 10, top: 15, elevation: 3, backgroundColor: colors.card, width: 40, height: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.mainText }}>2</Text>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <Animated.Image source={require('../../../assets/credit_firebase.png')} style={{ resizeMode: 'contain', width: h, height: h, }} />
                      </View>

                      <SubBoxText title={'Firebase Official website'} text={'Especially thanks to the developer and maintainer, creators of this website'}
                        text1={'This website is not for react native but you can use there console for integration with your app and also read their detailed documentation for guidance'}
                        link={<LinkInButton text={'link'} link={"https://firebase.google.com/"} mt={10} b tf />}
                      />

                    </View>

                    <View style={{ paddingTop: 70 }}>

                      <View style={{ position: 'absolute', left: 10, top: 15, elevation: 3, zIndex: 1, backgroundColor: colors.card, width: 40, height: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.mainText }}>3</Text>
                      </View>

                      <SubBoxText title={'Other Creators'} text={'Especially thanks to the creators of the different packages, dependencies who put effort to make coding easier for us, these are available in NPM website free of cost'}
                        link={<LinkInButton text={'link'} navigation={"Libraries"} mt={10} b tf />}
                      />
                    </View>

                  </ScrollView>

                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <BannerLibrary_credits />
                  </View>

                </Animated.View>
        )
}

export default Credits