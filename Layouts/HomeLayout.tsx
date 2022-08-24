import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { AntDesign, Entypo } from '@expo/vector-icons';

const HomeLayout = () => {

    return (
        <SafeAreaView>
            <View className='w-full h-fit'>
                <View className='flex flex-row space-x-2 items-center justify-evenly h-16 bg-blue-400'>
                    <View className='w-1/4 bg-purple-400 h-full'></View>
                    <View className='w-28 bg-gray-400 h-10 rounded-full justify-between items-center flex-row '>
                        <Text className='pl-2 font-bold'>25,68$</Text>
                        <View className='pr-4 pl-1 border-l-[1px]'>
                            <AntDesign name="shoppingcart" size={24} color="red" />
                        </View>
                    </View>

                    <View className='w-36 bg-red-700 h-3/5 rounded-full flex-row items-center justify-center space-x-2'>
                        <AntDesign name="videocamera" size={24} color="white" />
                        <Text className='text-white'>DEMARRER</Text>
                    </View>
                    <View className=''>
                        <Entypo name="dots-three-vertical" size={24} color="gray" />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeLayout