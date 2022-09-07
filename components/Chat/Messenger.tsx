import { View, Text } from 'react-native'
import React from 'react'
import { ChatProps } from '../../interfaces/Data'

const Messenger = ({ text }: ChatProps) => {
    return (
        <View className='w-10/12 bg-white rounded-md ml-4 pl-4 py-1 '>
            <Text className='text-base leading-8' style={{ fontFamily: 'Montserrat-Medium' }}>{text}</Text>
            <View className='w-full items-end'>
                <Text className='pr-5'>17:16</Text>
            </View>
        </View>
    )
}

export default Messenger