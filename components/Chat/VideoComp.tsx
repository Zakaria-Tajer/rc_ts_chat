import { View, Text } from 'react-native'
import React from 'react'
import { Video } from 'expo-av';

const VideoComp = (url: string | any, isEqual: any) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <View className={isEqual ? 'w-full items-end pr-3 mt-2' : 'w-full items-start pl-3 mt-2'}>
            <Video
                ref={video}
                style={{
                    width: 200,
                    height: 400,
                    
                }}
                className='rounded'
                source={{
                    uri: url.source.uri,
                }}
                useNativeControls
                // resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </View>
    )
}

export default VideoComp