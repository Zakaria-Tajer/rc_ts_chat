import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const Header = () => {
    return (
        <SafeAreaView>
            <View className='w-full h-fit bg-white'>
            <View className='flex flex-row space-x-2 items-center justify-evenly h-16'>
                <View className='w-1/4 h-full'></View>
                <View className='w-28 bg-gray-400 h-10 rounded-full justify-between items-center flex-row '>
                    <Text className='pl-2 font-bold'>25,68$</Text>
                    <View className='pr-4 pl-1 border-l-[1px]'>
                        <AntDesign name="shoppingcart" size={24} color="#ad0808" />
                    </View>
                </View>

                <View className='w-36 bg-[#ad0808] h-3/5 rounded-full flex-row items-center justify-center space-x-2'>
                    <AntDesign name="videocamera" size={24} color="white" />
                    <Text className='text-white'>DEMARRER</Text>
                </View>
                <View className=''>
                    <Entypo name="dots-three-vertical" size={24} color="#d3d3d3" />
                </View>
            </View>
        </View>
        </SafeAreaView>
    )
}

export default Header