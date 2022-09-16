import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
const Programme = () => {
  const date = 'Prevue le 14 nov. 2020 a 1430'
  const nums = 'N° 456 8954 45 3'
  return (
    <>
      <View className='h-fit bg-gray-400 w-full flex-row border-b-[1px] border-gray-200 justify-between'>
        <View className='pl-4 py-3 w-2/3'>
          <Text className='text-lg font-bold text-gray-800'>Meeting bilan CA Japon</Text>
          <Text className='text-xs font-bold text-gray-800'>{date}</Text>
          <Text className='text-xs font-bold text-[#ad0808]'>{nums}</Text>
        </View>
        <View className='space-y-3 pr-4 py-4 items-end'>
          <View className='bg-[#ad0808] space-x-2 px-3 rounded-md py-1.5 flex-row items-center'>
            <AntDesign name="plus" size={14} color="white" />
            <Text className='text-white'>participants</Text>
          </View>
          <AntDesign name="delete" size={24} color="black" />
        </View>
      </View>
      <View className='h-fit bg-gray-400 w-full flex-row border-b-[1px] border-gray-200 justify-between'>
        <View className='pl-4 py-3 w-2/3'>
          <Text className='text-lg font-bold text-gray-800'>Meeting bilan CA Japon</Text>
          <Text className='text-xs font-bold text-gray-800'>{date}</Text>
          <Text className='text-xs font-bold text-[#ad0808]'>{nums}</Text>
        </View>
        <View className='space-y-3 pr-4 py-4 items-end'>
          <View className='bg-[#ad0808] space-x-2 px-3 rounded-md py-1.5 flex-row items-center'>
            <AntDesign name="plus" size={14} color="white" />
            <Text className='text-white'>Rejoindre</Text>
          </View>
          <AntDesign name="delete" size={24} color="black" />
        </View>
      </View>
    </>
  )
}

export default Programme