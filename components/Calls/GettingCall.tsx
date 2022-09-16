import { View, Text, Pressable } from 'react-native'
import React from 'react'


interface Props {
  hangup: () => void;
  join: () => void;
}
const GettingCall = (props: Props) => {
  return (
    <View className='w-full h-full items-center justify-center'>
      <Text>GettingCall</Text>

      <Pressable onPress={props.join}>
        <View className='w-40 h-10 items-center justify-center bg-green-600'>
          <Text>Join</Text>
        </View>
      </Pressable>
      <Pressable onPress={props.hangup}>
        <View className='w-40 h-10 items-center justify-center bg-red-600'>
          <Text>Hangup</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default GettingCall