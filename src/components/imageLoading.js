import { View,Image } from 'react-native'
import React, { useState } from 'react'
import ShowIndicator from './ShowIndicator'

const ImageLoading = ({ uri, source, width, height, roundness, backgroundColor, ...props }) => {
    
    const [loading, setLoading] = useState(false)
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, borderRadius: roundness ? roundness : 1000, overflow: 'scroll', width: width, height: height }}>
            {loading && <View style={{ position: 'absolute' }}>
                <ShowIndicator size={70} textShow />
            </View>}
            {<Image
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                source={uri ? { uri: uri } : source}
                style={{ width: width, height: height, ...props }}
            />}
        </View>
    )
}

export default ImageLoading