import { View,  StatusBar, Vibration } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';

const BN = ({ fc, sc }) => {

    const { colors, dark } = useTheme()
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'Home', title: 'Home', focusedIcon: 'home-variant', unfocusedIcon: 'home-variant-outline' },
        { key: "Guide", title: 'Guide', focusedIcon: 'information',unfocusedIcon: 'information-outline' }
    ]);

    const renderScene = BottomNavigation.SceneMap({
        Home: fc,
        Guide: sc,
        
    });

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />
            <BottomNavigation
                shifting
                // compact
                onTabPress={() => { Vibration.vibrate(40) }}
                activeColor={colors.primary}
                inactiveColor={colors.mainText}
                theme={{
                    colors: {
                        background: colors.background, // bottom navigation me jab shifting hoti ha to back py ye show hota ha
                        secondaryContainer: colors.primary + 30, // bottom navigation me icons ky backgroundColor change krny ka lia
                        onSurface: colors.mainText, // bottom navigation me icons ky nechy text / label ky color ko change krny ka lia
                        onSurfaceVariant: colors.mainText, // bottom navigation me icons ky nechy text changing to doran show hota ha color
                    }
                }}
                // sceneAnimationEnabled={true}
                barStyle={{ backgroundColor: colors.card, height:70 }}
                // sceneAnimationType='shifting'
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </View>
    );
}

export default BN