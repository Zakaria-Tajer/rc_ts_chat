import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Programme from '../../components/Reunions/Programme'
import Enregistrement from '../../components/Reunions/Enregistrement'

const ReunionScreen = () => {

  const [isPressed, setIsPressed] = useState<boolean>(false)


  return (
    <View className='w-full bg-blue-400 h-full '>
      <View className='w-full border-b-[1px] border-gray-200 py-3 max-h-20 h-16 bg-white flex-row justify-center items-center space-x-10'>
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
          <View className={!isPressed ? `border-b-4 rounded border-[#ad0808]` : ''}>
            <Text className={!isPressed ? 'pb-1 text-[#ad0808]' : 'pb-1 text-gray-400'}>PROGRAMME</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
          <View className={isPressed ? `border-b-4 rounded border-[#ad0808]` : ''}>
            <Text className={isPressed ? 'pb-1 text-[#ad0808]' : 'pb-1 text-gray-400'}>ENREGISTREMENTS</Text>
          </View>
        </TouchableOpacity>
      </View>
      {isPressed ? (
        <>
          <Enregistrement />
        </>
      ) : (
        <>
          <Programme />
        </>
      )}
    </View>
  )
}

export default ReunionScreen