import { View, Text } from 'react-native'
import React from 'react'

const ReunionScreen = () => {
  return (
    <View className='w-full bg-blue-400 h-full items-center justify-center'>
      <View className='bg-[#ad0808] h-20 w-full items-center justify-center'>
      <Text className='text-white text-lg ' style={{ fontFamily: 'Montserrat-Medium' }}>No reunions scheduled yet</Text>
      </View>
    </View>
  )
}

export default ReunionScreen