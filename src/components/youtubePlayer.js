import { Dimensions, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import ShowIndicator from './ShowIndicator';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import ImageLoading from './imageLoading';

const YoutubePlayerCustom = ({ id, }) => {
    const { colors } = useTheme()

    return (
        <View style={{backgroundColor:colors.card, borderRadius:16}}>

            <View style={{height:'100%', width:'100%',zIndex:1,alignItems:'center', position: 'absolute', justifyContent: 'center' }}>
                <ShowIndicator size={70} />
            </View>

            <LinkPreview

                text={`https://youtu.be/${id}`}
                renderLinkPreview={({ previewData }) => {
                    return (
                        <ImageLoading uri={previewData?.image?.url} height={Dimensions.get('screen').width * 0.56} width={'100%'} roundness={20} />
                    )
                }}
                containerStyle={{
                    color: colors.mainText,
                    borderRadius: 25,
                    overflow: 'hidden',
                     zIndex: 111111
                }}
            />

        </View>
    )
}

export default YoutubePlayerCustom