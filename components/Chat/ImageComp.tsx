import { View, Text, Image } from 'react-native'
import React from 'react'

const ImageComp = (url: string | any, isEqual: any) => {

    return (
        <View className={isEqual ? 'w-full items-end pr-3 mt-2' : 'w-full items-start pl-3 mt-2'}>
            <Image className='w-40 h-40 object-cover rounded mb-2' source={{ uri: url.source.uri }} />
        </View>
    )
}

export default ImageComp