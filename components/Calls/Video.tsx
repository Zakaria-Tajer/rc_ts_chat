import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MediaStream, RTCView} from 'react-native-webrtc'
interface VideoProps {
  hangup: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

const ButtonContainer = (videoProps: VideoProps) => {
  return (
    <Pressable onPress={videoProps.hangup}>
      <View className='w-40 h-10 items-center justify-center bg-red-600'>
        <Text>hangup</Text>
      </View>
    </Pressable>
  )
}


const Video = (videoProps: VideoProps) => {

  if(videoProps.localStream && !videoProps.remoteStream) {
    return (
      <View>
        <RTCView streamUrl={videoProps.localStream.toURL()} objectFit={'cover'} className='absolute w-full h-full' />
        <ButtonContainer hangup={videoProps.hangup}/> 
      </View>
    )
  }
  if(videoProps.localStream && videoProps.remoteStream) {
    return(
      <View>
        <RTCView streamURL={videoProps.localStream.toURL()} objectFit={'cover'} />
        <RTCView streamURL={videoProps.localStream.toURL()} objectFit={'cover'} />
        <ButtonContainer hangup={videoProps.hangup} /> 
      </View>
    )
  }



  return (
    <View>
      <Text>Video</Text>
    </View>
  )
}

export default Video