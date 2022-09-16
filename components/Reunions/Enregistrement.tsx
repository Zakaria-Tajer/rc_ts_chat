import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
const Enregistrement = () => {
  const date = 'Prevue le 14 nov. 2020 a 1430'
  const nums = 'N° 456 8954 45 3'
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <View className='h-fit bg-gray-400 w-full flex-row border-b-[1px] border-gray-200 justify-between'>
        <View className='pl-4 py-3 w-2/3'>
          <Text className='text-lg font-bold text-gray-800'>Meeting bilan CA Japon</Text>
          <Text className='text-xs font-bold text-gray-800'>{date}</Text>
          <Text className='text-xs font-bold text-[#ad0808]'>{nums}</Text>
        </View>
        <View className='w-fit relative'>
          <View className='space-y-3 pr-4 py-4 items-end'>
            <View className='bg-[#ad0808] space-x-2 px-3 rounded-md py-1.5 flex-row items-center'>
              <AntDesign name="download" size={14} color="white" />
              <Text className='text-white'>Telecharger</Text>
            </View>
            <Pressable onPress={() => setIsOpen(!isOpen)}>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </Pressable>
          </View>
          {isOpen && (
            <View className='bg-white absolute -bottom-[120px] right-6 py-3 px-5 space-y-4  shadow-md w-56 rounded h-fit'>
              <TouchableOpacity onPress={() => { }}>
                <Text className='text-base'>Voir l'enregistrement</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}>
                <Text className='text-base'>Lire les conversation</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}>
                <Text className='text-start text-base'>Supprimer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  )
}

export default Enregistrement