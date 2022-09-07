import { View, Text } from 'react-native'
import React from 'react'


interface MessageProps {
    user: any;
    message: any;
}


const Message = ({ user, message }: MessageProps) => {
    console.log(message);
    
  return (
    <View>
      <Text>{message.message}</Text>
    </View>
  )
}

export default Message

